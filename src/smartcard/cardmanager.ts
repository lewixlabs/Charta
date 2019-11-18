import { TsCard } from "tscard"
import Reader from "tscard/reader";

export class CardManager {

    public static async getReaderName() {
        try {
            const reader: Reader  = await TsCard.instance.detectReader(5000);
            return reader.name;
        } catch (e) {
            return e;
        }
    }
}

