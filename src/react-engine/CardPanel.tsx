import React from "react";
import { ICardInfo, ICardManagerStatus } from "../smartcard/cardmanager";
import { CustomBox } from "./chartaui/CustomBox";

export class CardPanel extends React.Component<ICardManagerStatus, ICardInfo> {

    constructor(props: ICardManagerStatus) {
        super(props);

        this.state = {
            atr: props.isCardInserted ? props.cardInfo.atr : "",
            cardType: props.isCardInserted ? props.cardInfo.cardType : "",
        };
    }

    // tslint:disable-next-line: max-line-length
    // https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/update/postrender_with_componentdidupdate.html
    // https://it.reactjs.org/docs/react-component.html#componentdidupdate
    public componentDidUpdate(prevProps: ICardManagerStatus, prevState: {}) {
        // tslint:disable-next-line: max-line-length
        if (prevProps !== this.props) {
            this.setState({
                atr: this.props.isCardInserted ? this.props.cardInfo.atr : "",
                cardType: this.props.isCardInserted ? this.props.cardInfo.cardType : "",
            });
        }
    }

    public render() {
        return (
            <div>
                <CustomBox title="Atr" text={this.state.atr}/>
                <CustomBox title="Card Type" text={this.state.cardType}/>
            </div>
        );
    }
}
