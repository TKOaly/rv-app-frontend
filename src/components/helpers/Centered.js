import './styles/Centered.scss';
import React from 'react';

const Centered = (props) => (
    <div className="centered" style={props.zIndex && { zIndex: props.zIndex }}>
        {props.children}
    </div>
);

export default Centered;
