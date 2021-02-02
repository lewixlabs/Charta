import CSS from "csstype";
import React from "react";
import { Button } from "react-desktop/windows";

const textFieldStyle: CSS.Properties = {
    display: "inline-block",
    marginRight: "20px",
    marginTop: "8px",
};

interface IButtonProps {
    text: string;
    clickEvent: () => void;
    color: string;
    hiddenStatus?: boolean;
}

export const CustomButton: React.FC<IButtonProps> = (props: IButtonProps) => {
    if (props.hiddenStatus)
        return (<div></div>);

    return (
        <div style={textFieldStyle}>
            <Button color={props.color} onClick={props.clickEvent}>
                {props.text}
            </Button>
        </div>
    );
};