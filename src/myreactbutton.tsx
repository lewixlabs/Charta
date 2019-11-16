import React = require("react");
import { testTsCard } from "./funny";

export class MyReactButton extends React.Component {

    playTsCard() {
        console.log("wow!!!!")
        testTsCard()
    }

    render() {
        return (
            <div>
                <button onClick={this.playTsCard}>CLICK ME!!</button>
            </div>
        );
    }
}