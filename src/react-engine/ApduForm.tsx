import CSS from "csstype";
import React from "react";
import Utilities from "tscard/utilities";
import { CardManager } from "../smartcard/cardmanager";
import { CustomButton } from "./chartaui/CustomButton";
import { CustomTextField } from "./chartaui/CustomTextField";


const marginTopDivStyle: CSS.Properties = {
    marginTop: "20px",
};

interface IApduFormProps {
    isVisible: boolean;
}

interface IApduToSend {
    cla: string;
    ins: string;
    p1: string;
    p2: string;
    le: string;
    lc: string;
    dataIn: string;
}

interface IApduResult {
    sw: string;
    dataOut: string;
}

interface IApduFormState {
    apduToSend: IApduToSend;
    apduResult: IApduResult;
    memoryCardOffset: string;
    memoryCardBytesToReadWrite: string;
}

export class ApduForm extends React.Component<IApduFormProps, IApduFormState> {

    constructor(props: IApduFormProps) {
        super(props);

        this.state = {
            apduToSend: {
                cla: "00",
                ins: "A4",
                p1: "00",
                p2: "00",
                // tslint:disable-next-line: object-literal-sort-keys
                lc: "02",
                le: "00",
                dataIn: "3F00",
            },
            // tslint:disable-next-line: object-literal-sort-keys
            apduResult: {
                sw: "",
                // tslint:disable-next-line: object-literal-sort-keys
                dataOut: "",
            },
            memoryCardBytesToReadWrite: "224",
            memoryCardOffset: "32",
        };

        this.onChangeApduField = this.onChangeApduField.bind(this);
        this.onBlurApduField = this.onBlurApduField.bind(this);
        this.sendApdu = this.sendApdu.bind(this);
        this.readBytes = this.readBytes.bind(this);
        this.writeBytes = this.writeBytes.bind(this);
        this.onChangeMemoryCardField = this.onChangeMemoryCardField.bind(this);
        this.onBlurMemoryCardField = this.onBlurMemoryCardField.bind(this);
    }

    public componentDidUpdate(prevProps: IApduFormProps) {

        if (prevProps.isVisible !== this.props.isVisible) {
            const apduToUpdate: IApduFormState = { ...this.state };
            apduToUpdate.apduResult.sw = "";
            apduToUpdate.apduResult.dataOut = "";
            this.setState(apduToUpdate);
        }
    }

    public render() {
        return (
            <div style={marginTopDivStyle} hidden={!this.props.isVisible}>
                <div hidden={CardManager.isSupportedMemoryCard()}>
                    <CustomTextField label="Cla" text={this.state.apduToSend.cla} charsLength={2} onChangeEvent={this.onChangeApduField} fieldName="cla" onBlurEvent={this.onBlurApduField} />
                    <CustomTextField label="Ins" text={this.state.apduToSend.ins} charsLength={2} onChangeEvent={this.onChangeApduField} fieldName="ins" onBlurEvent={this.onBlurApduField} />
                    <CustomTextField label="P1" text={this.state.apduToSend.p1} charsLength={2} onChangeEvent={this.onChangeApduField} fieldName="P1" onBlurEvent={this.onBlurApduField} />
                    <CustomTextField label="P2" text={this.state.apduToSend.p2} charsLength={2} onChangeEvent={this.onChangeApduField} fieldName="P2" onBlurEvent={this.onBlurApduField} />
                </div>
                <div hidden={CardManager.isSupportedMemoryCard()}>
                    <CustomTextField label="Lc" text={this.state.apduToSend.lc} charsLength={2} onChangeEvent={this.onChangeApduField} fieldName="Lc" onBlurEvent={this.onBlurApduField} />
                    <CustomTextField label="Data In" text={this.state.apduToSend.dataIn} charsLength={30} maxLength={250} onChangeEvent={this.onChangeApduField} fieldName="dataIn" onBlurEvent={this.onBlurApduField} />
                    <CustomTextField label="Le" text={this.state.apduToSend.le} charsLength={2} onChangeEvent={this.onChangeApduField} fieldName="Le" onBlurEvent={this.onBlurApduField} />
                </div>
                <div style={marginTopDivStyle} hidden={CardManager.isSupportedMemoryCard()}>
                    <CustomButton text="Send Apdu" clickEvent={this.sendApdu} color="#009999"/>
                </div>

                <div hidden={!CardManager.isSupportedMemoryCard()}>
                    <CustomTextField label="Offset" text={this.state.memoryCardOffset} charsLength={4} maxLength={4} onChangeEvent={this.onChangeMemoryCardField} fieldName="offset" onBlurEvent={this.onBlurMemoryCardField} />
                    <CustomTextField label="Length" text={this.state.memoryCardBytesToReadWrite} charsLength={4} maxLength={4} onChangeEvent={this.onChangeMemoryCardField} fieldName="byteslength" onBlurEvent={this.onBlurMemoryCardField} />
                </div>
                <div hidden={!CardManager.isSupportedMemoryCard()}>
                    <CustomButton text="Read Bytes" clickEvent={this.readBytes} color="#009999"/>
                    <CustomButton text="Write Bytes" clickEvent={this.writeBytes} color="#d15234"/>
                </div>

                <div style={marginTopDivStyle}>
                    <CustomTextField label="SW" text={this.state.apduResult.sw} charsLength={4} fieldName="SW" readOnly={true} />
                    <CustomTextField label="Data Out" text={this.state.apduResult.dataOut} charsLength={30} fieldName="dataOut" readOnly={true} />
                </div>
            </div>
        );
    }

    private onBlurApduField(event: React.FormEvent<HTMLInputElement>) {

        const newHexString: string = Utilities.bytesToHexString([parseInt(event.currentTarget.value, 16)]).toUpperCase();

        const apduToUpdate: IApduFormState = { ...this.state };
        switch (event.currentTarget.name) {
            case "cla":
                apduToUpdate.apduToSend.cla = newHexString;
                break;
            case "ins":
                apduToUpdate.apduToSend.ins = newHexString;
                break;
            case "P1":
                apduToUpdate.apduToSend.p1 = newHexString;
                break;
            case "P2":
                apduToUpdate.apduToSend.p2 = newHexString;
                break;
            case "Lc":
                apduToUpdate.apduToSend.lc = newHexString;
                break;
            case "Le":
                apduToUpdate.apduToSend.le = newHexString;
                break;
            case "dataIn":
                if (event.currentTarget.value.length > 0 && event.currentTarget.value.length % 2 !== 0)
                    apduToUpdate.apduToSend.dataIn = event.currentTarget.value.substr(0, event.currentTarget.value.length - 1) + "0" + event.currentTarget.value[event.currentTarget.value.length - 1];
                break;
        }
        this.setState(apduToUpdate);
    }

    private onChangeApduField(event: React.FormEvent<HTMLInputElement>) {

        const checkValidHexDigits = (previousStr: string, newStr: string): string => {

            if (!newStr)
                return "";

            const isNaNResult: boolean = isNaN(Number(`0x${newStr}`));
            return isNaNResult ? previousStr.toUpperCase() : newStr.toUpperCase();
        };

        const apduToUpdate: IApduFormState = { ...this.state };
        switch (event.currentTarget.name) {
            case "cla":
                apduToUpdate.apduToSend.cla = checkValidHexDigits(apduToUpdate.apduToSend.cla, event.currentTarget.value);
                break;
            case "ins":
                apduToUpdate.apduToSend.ins = checkValidHexDigits(apduToUpdate.apduToSend.ins, event.currentTarget.value);
                break;
            case "P1":
                apduToUpdate.apduToSend.p1 = checkValidHexDigits(apduToUpdate.apduToSend.p1, event.currentTarget.value);
                break;
            case "P2":
                apduToUpdate.apduToSend.p2 = checkValidHexDigits(apduToUpdate.apduToSend.p2, event.currentTarget.value);
                break;
            case "Lc":
                apduToUpdate.apduToSend.lc = checkValidHexDigits(apduToUpdate.apduToSend.lc, event.currentTarget.value);
                break;
            case "Le":
                apduToUpdate.apduToSend.le = checkValidHexDigits(apduToUpdate.apduToSend.le, event.currentTarget.value);
                break;
            case "dataIn":
                apduToUpdate.apduToSend.dataIn = checkValidHexDigits(apduToUpdate.apduToSend.dataIn, event.currentTarget.value);
                break;
        }
        this.setState(apduToUpdate);
    }

    private async sendApdu() {

        function hexStringToByte(str: string): number[] {
            if (!str) {
                return [];
            }

            const numberArray: number[] = [];
            for (let i: number = 0, len = str.length; i < len; i += 2) {
                numberArray.push(parseInt(str.substr(i, 2), 16));
            }

            return numberArray;
        }

        let [apduResult, err] = await CardManager.sendApdu(
            {
                Cla: parseInt(this.state.apduToSend.cla, 16),
                Ins: parseInt(this.state.apduToSend.ins, 16),
                P1: parseInt(this.state.apduToSend.p1, 16),
                P2: parseInt(this.state.apduToSend.p2, 16),
                // tslint:disable-next-line: object-literal-sort-keys
                Lc: parseInt(this.state.apduToSend.lc, 16),
                Le: parseInt(this.state.apduToSend.le, 16),
            },
            hexStringToByte(this.state.apduToSend.dataIn),
        );

        if (apduResult === null && err) {
            // tslint:disable-next-line: no-empty
            // tslint:disable-next-line: max-line-length
            if (err.includes("0x80100008")) {
                /*
                 * macOS workaround (but found in windows too)
                 * https://ludovicrousseau.blogspot.com/2017/03/macos-sierra-bug-scardtransmit-silently.html 
                */
                [apduResult, err] = await CardManager.sendApdu(
                    {
                        Cla: parseInt(this.state.apduToSend.cla, 16),
                        Ins: parseInt(this.state.apduToSend.ins, 16),
                        P1: parseInt(this.state.apduToSend.p1, 16),
                        P2: parseInt(this.state.apduToSend.p2, 16),
                        // tslint:disable-next-line: object-literal-sort-keys
                        Lc: parseInt(this.state.apduToSend.lc, 16),
                        Le: 250, // retry with valued le
                    },
                    hexStringToByte(this.state.apduToSend.dataIn),
                );
            }
        }
        const apduToUpdate: IApduFormState = { ...this.state };
        if (apduResult) {
            apduToUpdate.apduResult.sw = Utilities.bytesToHexString(apduResult.SW).toUpperCase();
            apduToUpdate.apduResult.dataOut = Utilities.bytesToHexString(apduResult.Data).toUpperCase();
        } else {
            apduToUpdate.apduResult.sw = "";
            apduToUpdate.apduResult.dataOut = err;
        }
        this.setState(apduToUpdate);
    }

    private onChangeMemoryCardField(event: React.FormEvent<HTMLInputElement>) {

        const checkValidIntDigits = (previousStr: string, newStr: string): string => {

            if (!newStr)
                return "";

            const isNaNResult: boolean = isNaN(Number(newStr));
            return isNaNResult ? previousStr : newStr;
        };

        const apduToUpdate: IApduFormState = { ...this.state };

        switch (event.currentTarget.name) {
            case "offset":
                apduToUpdate.memoryCardOffset = checkValidIntDigits(apduToUpdate.memoryCardOffset, event.currentTarget.value);
                break;
            case "byteslength":
                apduToUpdate.memoryCardBytesToReadWrite = checkValidIntDigits(apduToUpdate.memoryCardBytesToReadWrite, event.currentTarget.value);
                break;
        }
        this.setState(apduToUpdate);
    }

    private onBlurMemoryCardField(event: React.FormEvent<HTMLInputElement>) {

        if (!event.currentTarget.value) {
            const apduToUpdate: IApduFormState = { ...this.state };

            switch (event.currentTarget.name) {
                case "offset":
                    apduToUpdate.memoryCardOffset = "0";
                    break;
                case "byteslength":
                    apduToUpdate.memoryCardBytesToReadWrite = "0";
                    break;
            }
            this.setState(apduToUpdate);
        }
    }

    // tslint:disable-next-line: member-ordering
    private async readBytes() {
        const [readOK, bufferResult] = await CardManager.readMemoryCard(parseInt(this.state.memoryCardOffset, 10), parseInt(this.state.memoryCardBytesToReadWrite, 10));

        const apduToUpdate: IApduFormState = { ...this.state };
        apduToUpdate.apduResult.sw = readOK ? "9000" : "Error";
        if (readOK && bufferResult && bufferResult.length > 0)
            apduToUpdate.apduResult.dataOut = Utilities.bytesToHexString(bufferResult).toUpperCase();

        this.setState(apduToUpdate);
    }

    private async writeBytes() {

        function hexStringToByte(str: string): number[] {
            if (!str) {
                return [];
            }

            const numberArray: number[] = [];
            for (let i: number = 0, len = str.length; i < len; i += 2) {
                numberArray.push(parseInt(str.substr(i, 2), 16));
            }

            return numberArray;
        }

        const writeOK: boolean = await CardManager.writeMemoryCard(parseInt(this.state.memoryCardOffset, 10), hexStringToByte(this.state.apduToSend.dataIn));

        const apduToUpdate: IApduFormState = { ...this.state };
        apduToUpdate.apduResult.sw = writeOK ? "9000" : "Error";

        this.setState(apduToUpdate);
    }

}
