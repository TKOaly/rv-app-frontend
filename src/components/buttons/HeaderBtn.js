import './styles/Button.css';
import './styles/HeaderBtn.css';
import Loader from '../loaders/Loader';
import PropTypes from 'prop-types';
import React from 'react';

const HeaderBtn = ({ onClick, children, fill, hover, loader, ...props }) => {
    let className = 'btn';
    fill ? (className += ' headerbtn-fill') : (className += ' headerbtn');
    hover && (fill ? (className += ' headerbtn-fill-hover') : (className += ' headerbtn-hover'));

    return (
        <button {...props} onClick={onClick} className={className}>
            {!loader ? <span className="btnContent">{children}</span> : <Loader />}
        </button>
    );
};

HeaderBtn.propTypes = {
    /** Click handler. */
    onClick: PropTypes.func,
    /** Button fill. If set to `true`, the button's colors will "invert". */
    fill: PropTypes.bool,
    /** Hover effect. If set to `true`, the button will have a hover effect. */
    hover: PropTypes.bool,
    /** Loader effect. If set to `true`, will show a CSS loader instead of button text. */
    loader: PropTypes.bool
};

HeaderBtn.defaultProps = {
    onClick: null,
    fill: false,
    hover: false,
    loader: false
};

export default HeaderBtn;
