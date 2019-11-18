import React = require("react");
import { testTsCard } from "./funny";

export class MyReactButton extends React.Component {

    public playTsCard() {
        console.log("wow!!!!");
        testTsCard();
    }

    public render() {
        return (
            <div>
                <button onClick={this.playTsCard}>CLICK ME!!</button>
            </div>
        );
    }
}
