import CSS from "csstype";
import React from "react";
import { Box, Text } from "react-desktop/macOs";

interface IBoxProps {
    title: string;
    text?: string;
    color?: string;
    backgroundColor?: string;
}

export const CustomBox: React.FC<IBoxProps> = (props: IBoxProps) => {

    const boxStyle: CSS.Properties = {
        color: props.color,
    };

    return (
        <div>
            <Text style={boxStyle} marginTop="8px" marginBottom="4px">{props.title}</Text>
            <Box padding="10px 10px" background={props.backgroundColor} style={boxStyle}>
                <Text style={boxStyle}>{props.text === undefined || props.text === null ? "" : props.text}</Text>
            </Box>
        </div>
    );
};
