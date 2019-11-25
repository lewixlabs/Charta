import React from "react";
import { CustomTextField } from "./chartaui/CustomTextField";
import { Pin } from "react-desktop/macos";
import { CustomButton } from "./chartaui/CustomButton";

export class ApduForm extends React.Component {

    public render() {
        return <ApduGrid/>;
    }
}

// tslint:disable-next-line: max-classes-per-file
class ApduGrid extends React.Component {

    public render() {
        return (
            <div>
                <div>
                    <CustomTextField label="Cla" defaulText="0x00"/>
                    <CustomTextField label="Ins" defaulText="0x00"/>
                    <CustomTextField label="P1" defaulText="0x00"/>
                    <CustomTextField label="P2" defaulText="0x00"/>
                </div>
                <div>
                    <CustomTextField label="Lc" defaulText="0x00"/>
                    <CustomTextField label="Data In"/>
                    <CustomTextField label="Le" defaulText="0x00"/>
                </div>
                <div>
                    <CustomButton text="Send Apdu"/>
                </div>
            </div>
        );
    }
}
