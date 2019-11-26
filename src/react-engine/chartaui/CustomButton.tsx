import React from "react";
import { Button } from "react-desktop/macOs";

interface IButtonProps {
    text: string;
    clickEvent: () => void;
}

export const CustomButton: React.FC<IButtonProps> = (props: IButtonProps) => {
    return (
        <Button color="blue" onClick={props.clickEvent} marginLeft="10" marginTop="20">
            {props.text}
        </Button>
    );
};