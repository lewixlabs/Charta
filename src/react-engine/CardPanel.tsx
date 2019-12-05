import React from "react";
import { ICardInfo, ICardManagerStatus } from "../smartcard/cardmanager";
import { CustomBox } from "./chartaui/CustomBox";
import { CustomTextField } from "./chartaui/CustomTextField";

export class CardPanel extends React.Component<ICardManagerStatus, ICardInfo> {

    public render() {
        return (
            <div hidden={!this.props.isCardInserted}>
                <CustomBox title="Card Type" text={this.props.isCardInserted ? this.props.cardInfo.cardType : ""} backgroundColor="#3b3a39" color="darkgray"/>
                <CustomTextField label="ATR" readOnly={true} text={this.props.isCardInserted ? this.props.cardInfo.atr.toUpperCase() : ""} charsLength={30}/>
            </div>
        );
    }
}
