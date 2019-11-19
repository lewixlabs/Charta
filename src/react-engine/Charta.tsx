import React = require("react");
import { CardManager, ICardManagerStatus } from "../smartcard/cardmanager";
import { CardPanel } from "./CardPanel";
import { ReaderPanel } from "./ReaderPanel";

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
            <div>
                <ReaderPanel name={this.state.readerName}/>
                <CardPanel isCardInserted={this.state.isCardInserted} cardInfo={this.state.cardInfo} isActive={this.state.isActive} readerName={this.state.readerName}/>
            </div>
        );
    }

    private async startCardOps() {
        const readerStatus: ICardManagerStatus = await CardManager.openCardReader();
        console.log(readerStatus);

        this.setState(readerStatus);
    }
}
