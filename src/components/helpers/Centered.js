import React from 'react';
import './styles/Centered.css';

const Centered = (props) => (
    <div className="centered" style={props.zIndex && { zIndex: props.zIndex }}>
        {props.children}
    </div>
);

export default Centered;
