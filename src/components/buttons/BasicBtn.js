import './styles/BasicBtn.css';
import './styles/Button.css';
import Loader from '../loaders/Loader';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Basic button.
 *
 * Suitable for UI actions, that do not change the current page or execute a critical action, such as submitting a form.
 */
const BasicBtn = ({ onClick, children, fill, hover, loader, ...props }) => {
    let className = 'btn';
    fill ? (className += ' basic-fill') : (className += ' basic');
    hover && (fill ? (className += ' basic-fill-hover') : (className += ' basic-hover'));

    return (
        <button {...props} onClick={onClick} className={className}>
            {!loader ? <span className="btnContent">{children}</span> : <Loader />}
        </button>
    );
};

BasicBtn.propTypes = {
    /** Click handler. */
    onClick: PropTypes.func,
    /** Button fill. If set to `true`, the button's colors will "invert". */
    fill: PropTypes.bool,
    /** Hover effect. If set to `true`, the button will have a hover effect. */
    hover: PropTypes.bool,
    /** Loader effect. If set to `true`, will show a CSS loader instead of button text. */
    loader: PropTypes.bool
};

BasicBtn.defaultProps = {
    onClick: null,
    fill: false,
    hover: false,
    loader: false
};

export default BasicBtn;
