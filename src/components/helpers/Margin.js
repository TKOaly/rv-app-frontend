import React from 'react';

const Margin = (props) => (
    <div
        className="margin"
        style={{
            margin: props.margin,
            display: props.inlineBlock ? 'inline-block' : 'block'
        }}
    >
        {props.children}
    </div>
);

export default Margin;
