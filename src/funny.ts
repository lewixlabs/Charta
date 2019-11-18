import { TsCard } from 'tscard'
import Reader from 'tscard/reader';

export async function testTsCard() {
    try {
        let reader: Reader  = await TsCard.instance.detectReader(3000);
    } catch(e) {
        console.log(e);
    }
}
