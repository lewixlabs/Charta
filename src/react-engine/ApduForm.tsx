import React from "react";

export class ApduForm extends React.Component {

    public render() {
        return <ApduGrid/>;
    }
}

// tslint:disable-next-line: max-classes-per-file
class ApduGrid extends React.Component {

    public render() {
        return (
            <div>
                <div>
                    <ApduField/>
                    <ApduField/>
                    <ApduField/>
                    <ApduField/>
                    <ApduField/>
                </div>

                <div>
                    <ApduField/> // Lc
                    <ApduField length={1024}/> // Data In
                    <ApduField/> // Le
                </div>
            </div>
        );
    }
}

interface IApduFieldParams {
    length?: number;
}

// tslint:disable-next-line: max-classes-per-file
class ApduField extends React.Component<IApduFieldParams, {}> {

    public render() {
        return (
            <div>
                <textarea maxLength={this.props.length === undefined ? 2 : this.props.length}/>
            </div>
        );
    }
}