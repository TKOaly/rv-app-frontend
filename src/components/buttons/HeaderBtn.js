import './styles/Button.scss';
import './styles/HeaderBtn.scss';
import Loader from '../loaders/Loader';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const HeaderBtn = ({ onClick, children, fill, hover, loader, className, ...props }) => {
    return (
        <button {...props} onClick={onClick} className={classNames('btn', {
            'headerbtn-fill-hover': fill && hover,
            'headerbtn-hover': !fill && hover,
            headerbtn: !fill,
            'headerbtn-fill': fill,
            [className]: className !== undefined
        })}>
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
