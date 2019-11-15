import * as React from "react";
import { launchLink } from "./funny";

export class MyReactButton extends React.Component {

    playTsCard() {
        console.log("wow!!!!")
        launchLink();
    }

    render() {
        return (
            <div>
                <button onClick={this.playTsCard}>CLICK ME!!</button>
            </div>
        );
    }
}