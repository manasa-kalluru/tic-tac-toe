import React from 'react';
import classes from './Square.css';

const square = (props) => {
    let buttonStyle;
    if(props.highlight){
        buttonStyle = {
            backgroundColor : 'green'
        };
    }
    return (
        <button className={classes.Square} onClick={props.onClick} style={buttonStyle}>
            {props.value}
        </button>
    );
}

export default square;
