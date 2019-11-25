import { TsCard } from "tscard";
import SmartCard, { CardEvent } from "tscard/cards/smartcard";
import Reader from "tscard/reader";
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
             readerName: "",
            };

            const reader: Reader  = await TsCard.instance.detectReader(5000);

            if (reader == null || reader.name === "") {
                return result;
            }
            this.cardManagerActive = true;

            const [cardInserted, card] = await TsCard.instance.insertCard(3000);
            result.readerName = reader.name;
            result.isCardInserted = cardInserted;
            if (cardInserted){
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
                readerName: "",
            };
        }
    }

    public static listenCardEvents(f: (cardEvent: CardEvents, cardInfo: ICardInfo) => void) {
        TsCard.instance.onCardEvent((e: CardEvent, c: SmartCard, err: Error) => {

            const atrDetected: string = c !== null ? Utilities.bytesToHexString(c.atr) : "";
            const isMemoryCardDetected: boolean = c !== null ? c.isMemoryCard : false;

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

    private static cardManagerActive: boolean = false;
}

