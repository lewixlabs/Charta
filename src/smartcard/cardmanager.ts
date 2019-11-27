import { TsCard } from "tscard";
import SmartCard, { CardEvent } from "tscard/cards/smartcard";
import Reader, { Apdu, ApduResponse } from "tscard/reader";
import Utilities from "tscard/utilities";


export enum CardEvents {
    CardInserted = CardEvent.Inserted,
    CardRemoved = CardEvent.Removed,
}

export interface ICardInfo {
    atr: string;
    cardType: string;
}

export interface ICardManagerStatus {
    isActive: boolean;
    readerName: string;
    isCardInserted: boolean;
    cardInfo?: ICardInfo;
}


export class CardManager {

    public static async openCardReader(): Promise<ICardManagerStatus> {
        try {
            const result: ICardManagerStatus = {
             cardInfo: null,
             isActive: this.cardManagerActive,
             isCardInserted: false,
             readerName: "No Reader Detected",
            };

            this.actualReader = await TsCard.instance.detectReader(5000);

            if (this.actualReader == null || this.actualReader.name === "") {
                return result;
            }
            this.cardManagerActive = true;

            const [cardInserted, card] = await TsCard.instance.insertCard(3000);
            result.readerName = this.actualReader.name;
            result.isCardInserted = cardInserted;
            if (cardInserted){
                this.actualCard = card;
                result.cardInfo = {
                    atr: Utilities.bytesToHexString(card.atr),
                    cardType: card.isMemoryCard ? "Memory Card" : "Chip Card",
                };
            }
            result.isActive = this.cardManagerActive;

            return result;
        } catch (e) {
            return {
                cardInfo: null,
                isActive: false,
                isCardInserted: false,
                readerName: "No Reader Detected",
            };
        }
    }

    public static listenCardEvents(f: (cardEvent: CardEvents, cardInfo: ICardInfo) => void) {
        TsCard.instance.onCardEvent((e: CardEvent, c: SmartCard, err: Error) => {

            const atrDetected: string = c !== null ? Utilities.bytesToHexString(c.atr) : "";
            const isMemoryCardDetected: boolean = c !== null ? c.isMemoryCard : false;
            this.actualCard = c;

            // tslint:disable-next-line: max-line-length
            f(e === CardEvent.Inserted ? CardEvents.CardInserted : CardEvents.CardRemoved, { atr: atrDetected, cardType: isMemoryCardDetected ? "Memory Card" : "Chip Card"});
        });
    }

    public static closeCardReader() {
        TsCard.instance.close();
    }

    public static async getCardInserted(f: (cardManagerEvent: ICardInfo) => void) {

        try {
            const [a , card] = await TsCard.instance.insertCard(3000);
            return f({
                atr: "",
                cardType: "Card Inserted",
            });
        } catch (e) {
            return ({
                atr: "",
                cardType: e,
            });
        }
    }

    public static async sendApdu(apdu: Apdu, dataIn: number[]): Promise<[ApduResponse, string]> {
        try {
            return [await this.actualReader.sendApdu(this.actualCard, apdu, dataIn), ""];
        } catch (e) {
            return [null, e];
        }
    }

    private static cardManagerActive: boolean = false;
    private static actualReader: Reader = null;
    private static actualCard: SmartCard = null;
}

