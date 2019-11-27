import CSS from "csstype";
import React from "react";
import { TextInput } from "react-desktop/macOs";

const textFieldStyle: CSS.Properties = {
    display: "inline-block",
};

interface ITextFieldProps {
    label: string;
    text?: string;
    charsLength: number;
    maxLength?: number;
    onChangeEvent?: (event: React.FormEvent<HTMLInputElement>) => void;
    fieldName?: string;
    readOnly?: boolean;
}

export const CustomTextField: React.FC<ITextFieldProps> = (props: ITextFieldProps) => {
    return (
        <div style={textFieldStyle}>
            <TextInput
                width={props.charsLength * 15}
                size="15"
                maxLength={props.maxLength === undefined ? 4 : props.maxLength}
                label={props.label}
                rounded="5"
                // placeholder="My Input"
                value={props.text !== undefined ? props.text : ""}
                // onChange={this.handleChange}
                marginLeft="10"
                marginRight="10"
                onChange={props.onChangeEvent}
                name={props.fieldName}
                readOnly={props.readOnly === undefined ? false : true}
            />
        </div>

    );
};