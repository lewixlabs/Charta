import React = require("react");
import { CustomBox } from "./chartaui/CustomBox";

interface IReaderProps {
    name: string;
}

export class ReaderPanel extends React.Component<IReaderProps> {

    public render() {
        return (
            <CustomBox title="Reader Model" text={this.props.name}/>
        );
    }
}
