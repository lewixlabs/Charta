import React = require("react");
import { Box, Text } from "react-desktop/macos";

interface IReaderProps {
    name: string;
}

export class ReaderPanel extends React.Component<IReaderProps> {

    public render() {
        return (
                <Box label="Reader Model" padding="10px 30px">
                    <Text>{this.props.name}</Text>
                </Box>
        );
    }
}
