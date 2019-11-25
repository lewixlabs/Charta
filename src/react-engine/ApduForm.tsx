import CSS from "csstype";
import React from "react";
import { CustomBox } from "./chartaui/CustomBox";
import { CustomButton } from "./chartaui/CustomButton";
import { CustomTextField } from "./chartaui/CustomTextField";

const divStyle: CSS.Properties = {
    marginTop: "20px",
};

export class ApduForm extends React.Component {

    public render() {
        return <ApduGrid/>;
    }
}

// tslint:disable-next-line: max-classes-per-file
class ApduGrid extends React.Component {

    public render() {
        return (
            <div style={divStyle}>
                <div>
                    <CustomTextField label="Cla" defaulText="00" charsLength={2}/>
                    <CustomTextField label="Ins" defaulText="A4"charsLength={2}/>
                    <CustomTextField label="P1" defaulText="00"charsLength={2}/>
                    <CustomTextField label="P2" defaulText="00"charsLength={2}/>
                </div>
                <div>
                    <CustomTextField label="Lc" defaulText="00" charsLength={2}/>
                    <CustomTextField label="Data In" defaulText="3F00" charsLength={30}/>
                    <CustomTextField label="Le" defaulText="00" charsLength={2}/>
                </div>
                <div>
                    <CustomButton text="Send Apdu"/>
                </div>
                <div style={divStyle}>
                    <CustomBox title="SW / Data Out"/>
                </div>
            </div>
        );
    }
}
