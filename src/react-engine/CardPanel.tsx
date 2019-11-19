import React from "react";
import { ICardInfo, ICardManagerStatus } from "../smartcard/cardmanager";

export class CardPanel extends React.Component<ICardManagerStatus, ICardInfo> {

    constructor(props: ICardManagerStatus) {
        super(props);

        this.state = {
            atr: props.isCardInserted ? props.cardInfo.atr : "",
            cardType: props.isCardInserted ? props.cardInfo.cardType : "",
        };
    }

    // public componentDidUpdate() {
    //     this.setState({
    //         atr: this.props.isCardInserted ? this.props.cardInfo.atr : "",
    //         cardType: this.props.isCardInserted ? this.props.cardInfo.cardType : "",
    //     });
    // }

    public render() {
        return (
            <div>
                <h2>Atr: {this.state.atr}</h2>
                <h2>Card Type: {this.state.cardType}</h2>
            </div>
        );
    }
}
