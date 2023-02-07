import React, { Component } from 'react';
import { Box } from '@mui/material';

class History extends Component {
    render() {
        return(
            <Box component="div">
                { this.props.children.map((item, index) => <div key={index}>{ item }</div>) }
            </Box>
        )
    }
}

export default History;
