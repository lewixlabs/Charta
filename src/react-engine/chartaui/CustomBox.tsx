import React from "react";
import { Box, Text } from "react-desktop/macOs";

interface IBoxProps {
    title: string;
    text?: string;
}

export const CustomBox: React.FC<IBoxProps> = (props: IBoxProps) => {
    return (
        <div>
            <Box label={props.title} padding="10px 10px">
                <Text>{props.text === undefined || props.text === null ? "" : props.text}</Text>
            </Box>
        </div>
    );
};
