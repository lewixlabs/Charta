import { TsCard } from "tscard";

export async function launchLink() {
    console.log("sdsds!!!!!");
    
    try {
        let reader = await TsCard.instance.detectReader(3000);
        console.log(reader.name);
    } catch (e) {
        console.log("Exception: " + e);
    }
}