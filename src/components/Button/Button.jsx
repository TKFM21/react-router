import React from 'react';
import './Button.css';

function Button(props) {
    return (
        <div key={props.sendKey} className="btn" onClick={props.onClickHandler}>
            {props.children}
        </div>
    );
}

export default Button;