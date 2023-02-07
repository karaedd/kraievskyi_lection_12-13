import React, { Component } from 'react';
import Button from '@mui/material/Button';

class Button1 extends Component {

    render() {
        return(
            <Button variant="contained"
                onClick={() => this.props.handleClick(this.props.children)}
            >
                {this.props.children}
            </Button>
        )
    }
}

export default Button1;
