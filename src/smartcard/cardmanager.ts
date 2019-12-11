import { TsCard } from "tscard";
import { PINStatus, Sle, MemoryCardTypes } from "tscard/cards/memorycard";
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
    memoryCardDetails: string;
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
            if (cardInserted) {

                let sleDetails: string = "";
                this.actualCard = card;
                if (this.actualCard instanceof Sle) {
                    const sleCard = this.actualCard as Sle;
                    sleDetails = sleCard.type == MemoryCardTypes.SLE5528 ? "SLEXX28" : "SLEXX42";
                }

                result.cardInfo = {
                    atr: Utilities.bytesToHexString(card.atr),
                    cardType: card.isMemoryCard ? "Memory Card" : "Chip Card",
                    memoryCardDetails: sleDetails,
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

            let sleDetails: string = "";
            if (this.actualCard instanceof Sle) {
                const sleCard = this.actualCard as Sle;
                sleDetails = sleCard.type == MemoryCardTypes.SLE5528 ? "SLEXX28" : "SLEXX42";
            }

            // tslint:disable-next-line: max-line-length
            f(e === CardEvent.Inserted ? CardEvents.CardInserted : CardEvents.CardRemoved, { atr: atrDetected, cardType: isMemoryCardDetected ? "Memory Card" : "Chip Card", memoryCardDetails: sleDetails });
        });
    }

    public static closeCardReader() {
        TsCard.instance.close();
    }

    public static async sendApdu(apdu: Apdu, dataIn: number[]): Promise<[ApduResponse, string]> {
        try {
            return [await this.actualReader.sendApdu(this.actualCard, apdu, dataIn), ""];
        } catch (e) {
            return [null, e];
        }
    }

    //#region Memory Cards

    public static isSupportedMemoryCard(): boolean {
        if (!this.actualCard)
            return false;

        if (!this.actualCard.isMemoryCard)
            return false;

        return this.actualCard instanceof Sle;
    }

    public static async readMemoryCard(startPosition: number, bytesToRead: number): Promise<[boolean, number[]]> {

        if (!this.actualCard || !this.actualCard.isMemoryCard)
            throw new Error("No MemoryCard Detected");

        if (!(this.actualCard instanceof Sle))
            throw new Error("MemoryCard Not Supported");

        const sleCard = this.actualCard as Sle;
        return sleCard.readBytes(startPosition, bytesToRead);
    }

    public static async writeMemoryCard(startPosition: number, bufferToWrite: number[]): Promise<boolean> {

        if (!this.actualCard || !this.actualCard.isMemoryCard)
            throw new Error("No MemoryCard Detected");

        if (!(this.actualCard instanceof Sle))
            throw new Error("MemoryCard Not Supported");

        const sleCard = this.actualCard as Sle;
        return sleCard.writeBytes(startPosition, bufferToWrite);
    }

    public static async verifyPSC(pinBuffer: number[]): Promise<[PINStatus, number]> {

        if (!this.actualCard || !this.actualCard.isMemoryCard)
            throw new Error("No MemoryCard Detected");

        if (!(this.actualCard instanceof Sle))
            throw new Error("MemoryCard Not Supported");

        const currentSle: Sle = this.actualCard;
        return await currentSle.verifyPIN(pinBuffer);
    }

    //#endregion

    private static cardManagerActive: boolean = false;
    private static actualReader: Reader = null;
    private static actualCard: SmartCard = null;
}

