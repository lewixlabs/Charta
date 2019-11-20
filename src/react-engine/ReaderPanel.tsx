import React = require("react");

interface IReaderProps {
    name: string;
}

export class ReaderPanel extends React.Component<IReaderProps> {

    public render() {
        return (
            <header className="toolbar toolbar-header">
                <h1 className="title">Reader: {this.props.name}</h1>
            </header>
        );
    }
}
