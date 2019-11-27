import CSS from "csstype";
import React from "react";
import { Apdu } from "tscard/reader";
import { CustomBox } from "./chartaui/CustomBox";
import { CustomButton } from "./chartaui/CustomButton";
import { CustomTextField } from "./chartaui/CustomTextField";

const marginTopDivStyle: CSS.Properties = {
    marginTop: "20px",
};

interface IApduFormProps {
    isVisible: boolean;
}

export class ApduForm extends React.Component<IApduFormProps, {}> {

    public render() {
        return (
            <div style={marginTopDivStyle} hidden={!this.props.isVisible}>
                <ApduGrid />
                <div style={marginTopDivStyle}>
                    <CustomBox title="SW / Data Out" />
                </div>
            </div>
        );
    }
}

interface IApduGridState {

    cla: string;
    ins: string;
    p1: string;
    p2: string;
    le: string;
    lc: string;
    dataIn: string;
}

// tslint:disable-next-line: max-classes-per-file
class ApduGrid extends React.Component<{}, IApduGridState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            cla: "00",
            ins: "A4",
            p1: "00",
            p2: "00",
            // tslint:disable-next-line: object-literal-sort-keys
            lc: "02",
            le: "00",
            dataIn: "3F00",
        };

        this.onChangeApduField = this.onChangeApduField.bind(this);
        this.sendApdu = this.sendApdu.bind(this);
    }

    public render() {
        return (
            <div>
                <div>
                    <CustomTextField label="Cla" text={this.state.cla} charsLength={2} onChangeEvent={this.onChangeApduField} fieldName="cla" />
                    <CustomTextField label="Ins" text={this.state.ins} charsLength={2} onChangeEvent={this.onChangeApduField} fieldName="ins" />
                    <CustomTextField label="P1" text={this.state.p1} charsLength={2} onChangeEvent={this.onChangeApduField} fieldName="P1" />
                    <CustomTextField label="P2" text={this.state.p2} charsLength={2} onChangeEvent={this.onChangeApduField} fieldName="P2" />
                </div>
                <div>
                    <CustomTextField label="Lc" text={this.state.lc} charsLength={2} onChangeEvent={this.onChangeApduField} fieldName="Lc" />
                    <CustomTextField label="Data In" text={this.state.dataIn} charsLength={30} onChangeEvent={this.onChangeApduField} fieldName="dataIn" />
                    <CustomTextField label="Le" text={this.state.le} charsLength={2} onChangeEvent={this.onChangeApduField} fieldName="Le" />
                </div>
                <div>
                    <CustomButton text="Send Apdu" clickEvent={this.sendApdu} />
                </div>
            </div>
        );
    }

    private onChangeApduField(event: React.FormEvent<HTMLInputElement>) {
        switch (event.currentTarget.name) {
            case "cla":
                this.setState({
                    cla: event.currentTarget.value,
                });
                break;
            case "ins":
                this.setState({
                    ins: event.currentTarget.value,
                });
                break;
            case "P1":
                this.setState({
                    p1: event.currentTarget.value,
                });
                break;
            case "P2":
                this.setState({
                    p2: event.currentTarget.value,
                });
                break;
            case "Lc":
                this.setState({
                    lc: event.currentTarget.value,
                });
                break;
            case "Le":
                this.setState({
                    le: event.currentTarget.value,
                });
                break;
            case "dataIn":
                this.setState({
                    dataIn: event.currentTarget.value,
                });
                break;
        }
    }

    private sendApdu() {
        console.log(this.state);

    }
}
