import React = require("react");
import { CardManager, ICardManagerStatus, CardEvents, ICardInfo } from "../smartcard/cardmanager";
import { CardPanel } from "./CardPanel";
import { ReaderPanel } from "./ReaderPanel";
import { ApduForm } from "./ApduForm";

interface IProps {
}

export class Charta extends React.Component<IProps, ICardManagerStatus> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            isActive: false,
            isCardInserted: false,
            //cardInfo: null,
            readerName: "Reader detecting...",
        };
    }

    public componentDidMount() {
        this.startCardOps();
    }

    public render() {
        return (
            <div className="window">
                <div className="window-content">
                    <div className="padded-more">
                            <h2 className="nav-group-title">Reader Info</h2>
                            <ReaderPanel name={this.state.readerName}/>
                            <CardPanel {...this.state}/>
                            <ApduForm/>
                    </div>
                </div>
            </div>
        );
    }

    private async startCardOps() {
        const readerStatus: ICardManagerStatus = await CardManager.openCardReader();
        // console.log(readerStatus);

        this.setState(readerStatus);

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
