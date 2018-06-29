import React from 'react';

const Padding = (props) => (
    <div
        className="padding"
        style={{
            padding: props.padding,
            display: props.inlineBlock ? 'inline-block' : 'block'
        }}
    >
        {props.children}
    </div>
);

export default Padding;
