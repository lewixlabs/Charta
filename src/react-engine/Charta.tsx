import React = require("react");
import { CardManager } from "../smartcard/cardmanager";
import { ReaderPanel } from "./ReaderPanel";

interface IProps {
}

interface IState {
    chartaReaderName: string;
}

export class Charta extends React.Component<IProps,IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            chartaReaderName: "Reader detecting...",
        };
    }

    public componentDidMount() {
        this.updateReaderName();
    }

    public render() {
        return (
            <div>
                <ReaderPanel name={this.state.chartaReaderName}/>
            </div>
        );
    }

    private async updateReaderName() {
        const readerName = await CardManager.getReaderName();
        this.setState({
            chartaReaderName : readerName,
        });
    }
}
