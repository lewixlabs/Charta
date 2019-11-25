import CSS from "csstype";
import React from "react";
import { TextInput } from "react-desktop/macOs";

const textFieldStyle: CSS.Properties = {
    display: "inline-block",
};

interface ITextFieldProps {
    label: string;
    defaulText?: string;
    charsLength: number;
    maxLength?: number;
}

export const CustomTextField: React.FC<ITextFieldProps> = (props: ITextFieldProps) => {
    return (
        <div style={textFieldStyle}>
            <TextInput
                width={props.charsLength * 15}
                // width={props.stretched !== undefined && props.stretched ? "" : "45"}
                size="15"
                maxLength={props.maxLength === undefined ? 4 : props.maxLength}
                label={props.label}
                rounded="5"
                // placeholder="My Input"
                defaultValue={props.defaulText}
                // onChange={this.handleChange}
                marginLeft="10"
                marginRight="10"
            />
        </div>

    );
};