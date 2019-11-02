import './styles/ErrorNotification.scss';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * Error notification component.
 */
const ErrorNotification = ({ message, shadow }) => {
    return (
        <div
            className={classNames('error-message', {
                'error-message-shadow': shadow
            })}
        >
            <svg className="cross" width="70" height="70">
                <path d="m35,35l-18.3,-18.3" />
                <path d="m35,35l18.3,18.3" />
                <path d="m35,35l-18.3,18.3" />
                <path d="m35,35l18.3,-18.3" />
            </svg>
            <div className="inner">
                <div className="notification-text">{message}</div>
            </div>
        </div>
    );
};

ErrorNotification.propTypes = {
    /** Notification message. */
    message: PropTypes.string.isRequired,
    /** Shadow effect under the notification */
    shadow: PropTypes.bool
};

export default ErrorNotification;
