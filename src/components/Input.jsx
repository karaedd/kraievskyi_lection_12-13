import React, { Component } from 'react';
import Button from '@mui/material/Button';
import './Input.css';

class Input extends Component {
    render() {
        return(
            <Button variant="contained" className='input'>
                {this.props.children}
            </Button>
        )
    }
}

export default Input;
