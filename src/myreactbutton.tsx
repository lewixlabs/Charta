import React = require("react");

export class MyReactButton extends React.Component {

    playTsCard() {
        console.log("wow!!!!")
    }

    render() {
        return (
            <div>
                <button onClick={this.playTsCard}>CLICK ME!!</button>
            </div>
        );
    }
}