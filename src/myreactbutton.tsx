import React = require("react");
import { tsPlay } from "./funny";


export class MyReactButton extends React.Component {

    playTsCard() {
        console.log("wow!!!!")
        tsPlay();
    }

    render() {
        return (
            <div>
                <button onClick={this.playTsCard}>CLICK ME!!</button>
            </div>
        );
    }
}