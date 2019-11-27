import React = require("react");
import { Text, TitleBar, Window } from "react-desktop/macos";
import { CardManager, ICardInfo, ICardManagerStatus, CardEvents } from "../smartcard/cardmanager";
import { ApduForm } from "./ApduForm";
import { CardPanel } from "./CardPanel";
import { ReaderPanel } from "./ReaderPanel";

export class Charta extends React.Component<{}, ICardManagerStatus> {

    constructor(props: {}) {
        super(props);

        this.state = {
            isActive: false,
            isCardInserted: false,
            readerName: "Reader detecting...",
        };
    }

    public componentDidMount() {
        this.startCardOps();
    }

    public render() {
        return (
            <div>
                <ReaderPanel name={this.state.readerName} />
                <CardPanel {...this.state} />
                <ApduForm isVisible={this.state.isCardInserted}/>
            </div>

        );
    }

    private async startCardOps() {
        const readerStatus: ICardManagerStatus = await CardManager.openCardReader();
        // console.log(readerStatus);

        this.setState(readerStatus);

        if (readerStatus.isActive) {
            CardManager.listenCardEvents((cEvent: CardEvents, cInfo: ICardInfo) => {
                this.setState({
                    cardInfo: cInfo,
                    isActive: this.state.isActive,
                    isCardInserted: cEvent === CardEvents.CardInserted ? true : false,
                    readerName: this.state.readerName,
                });
            });
        }
    }
}
