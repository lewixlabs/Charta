import React = require("react");

interface IReaderProps {
    name: string;
}

export class ReaderPanel extends React.Component<IReaderProps> {

    public render() {
        return (
            <div>
                <h2>Reader: {this.props.name}</h2>
            </div>
        );
    }
}
