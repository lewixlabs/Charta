import React = require("react");

interface IReaderProps {
    name: string;
}

export class ReaderPanel extends React.Component<IReaderProps> {

    public render() {
        return (
                <div>
                    Model: {this.props.name}
                </div>
        );
    }
}
