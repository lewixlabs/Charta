import CSS from "csstype";
import React from "react";
import { Button } from "react-desktop/macOs";

interface IButtonProps {
    text: string;
}

export const CustomButton: React.FC<IButtonProps> = (props: IButtonProps) => {
    return (
        <Button color="blue" onClick={() => console.log('Clicked!')} marginLeft="10" marginTop="20">
            {props.text}
        </Button>

    );
};