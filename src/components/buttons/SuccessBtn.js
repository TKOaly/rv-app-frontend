import React from 'react';
import './styles/Button.css';
import './styles/SuccessBtn.css';
import Loader from './../loaders/Loader';
import PropTypes from 'prop-types';

const SuccessBtn = ({ onClick, children, fill, hover, loader, ...props }) => {
    let className = 'btn';
    fill ? (className += ' success-fill') : (className += ' success');
    hover && (fill ? (className += ' success-fill-hover') : (className += ' success-hover'));

    return (
        <button {...props} onClick={onClick} className={className}>
            {!loader ? <span className="btnContent">{children}</span> : <Loader />}
        </button>
    );
};

SuccessBtn.propTypes = {
    /** Click handler. */
    onClick: PropTypes.func,
    /** Button fill. If set to `true`, the button's colors will "invert". */
    fill: PropTypes.bool,
    /** Hover effect. If set to `true`, the button will have a hover effect. */
    hover: PropTypes.bool,
    /** Loader effect. If set to `true`, will show a CSS loader instead of button text. */
    loader: PropTypes.bool
};

SuccessBtn.defaultProps = {
    onClick: null,
    fill: false,
    hover: false,
    loader: false
};

export default SuccessBtn;
