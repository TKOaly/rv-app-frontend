import './styles/Button.scss';
import './styles/DangerBtn.scss';
import Loader from '../loaders/Loader';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const DangerBtn = ({ onClick, children, fill, hover, loader, ...props }) => {
    return (
        <button
            {...props}
            onClick={onClick}
            className={classNames('btn', {
                'danger-fill-hover': fill && hover,
                'danger-hover': !fill && hover,
                danger: !fill,
                'danger-fill': fill
            })}
        >
            {!loader ? <span className="btnContent">{children}</span> : <Loader />}
        </button>
    );
};

DangerBtn.propTypes = {
    /** Click handler. */
    onClick: PropTypes.func,
    /** Button fill. If set to `true`, the button's colors will "invert". */
    fill: PropTypes.bool,
    /** Hover effect. If set to `true`, the button will have a hover effect. */
    hover: PropTypes.bool,
    /** Loader effect. If set to `true`, will show a CSS loader instead of button text. */
    loader: PropTypes.bool
};

DangerBtn.defaultProps = {
    onClick: null,
    fill: false,
    hover: false,
    loader: false
};

export default DangerBtn;
