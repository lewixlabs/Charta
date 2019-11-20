import { TsCard } from "tscard"
import Reader from "tscard/reader";
import Utilities from "tscard/utilities";

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
             isActive: false,
             isCardInserted: false,
             readerName: "",
            };

            const reader: Reader  = await TsCard.instance.detectReader(15000);

            if (reader == null || reader.name === "") {
                return result;
            }

            const [cardInserted, card] = await TsCard.instance.insertCard(3000);
            result.readerName = reader.name;
            result.isCardInserted = cardInserted;
            if (cardInserted){
                result.cardInfo = {
                    atr: Utilities.bytesToHexString(card.atr),
                    cardType: card.isMemoryCard ? "Memory Card" : "Chip Card",
                };
            }
            result.isActive = true;

            return result;
        } catch (e) {
            return {
                isActive: false,
                isCardInserted: false,
                cardInfo: null,
                readerName: "",
            };
        }
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
}

