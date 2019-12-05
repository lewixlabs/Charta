import CSS from "csstype";
import React from "react";
import { Text, TextInput } from "react-desktop/macOs";

interface ITextFieldProps {
    background?: string;
    color?: string;
    label: string;
    text?: string;
    charsLength: number;
    maxLength?: number;
    onChangeEvent?: (event: React.FormEvent<HTMLInputElement>) => void;
    onBlurEvent?: (event: React.FormEvent<HTMLInputElement>) => void;
    fieldName?: string;
    readOnly?: boolean;
}

export const CustomTextField: React.FC<ITextFieldProps> = (props: ITextFieldProps) => {

    const divFieldStyle: CSS.Properties = {
        display: "inline-block",
    };

    const textFieldStyle: CSS.Properties = {
        background: props.background ? props.background : "#3b3a39",
        border: "0px solid darkgray",
        color: props.color ? props.color : "lightgray",
        display: "inline-block",
    };

    return (
            <div style={divFieldStyle}>
                <Text color={props.color ? props.color : "lightgray"} marginTop="10px">{props.label}</Text>
                <TextInput
                style={textFieldStyle}
                width={props.charsLength * 15}
                size="15"
                maxLength={props.maxLength === undefined ? 2 : props.maxLength}
                // label={props.label}
                // rounded="5"
                // placeholder="My Input"
                value={props.text !== undefined ? props.text : ""}
                // onChange={this.handleChange}
                marginLeft="0"
                marginRight="10"
                onChange={props.onChangeEvent}
                name={props.fieldName}
                readOnly={props.readOnly === undefined ? false : true}
                onBlur={props.onBlurEvent}
            />
            </div>
    );
};