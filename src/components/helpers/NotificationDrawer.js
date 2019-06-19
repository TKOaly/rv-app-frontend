import './styles/NotificationDrawer.scss';
import { Fade } from '../animations/Animations';
import { TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import ErrorNotification from '../notifications/ErrorNotification';
import PurchaseNotification from '../notifications/PurchaseNotification';
import React from 'react';
import SuccessNotification from '../notifications/SuccessNotification';

export const NotificationDrawer = ({ notifications, purchases }) => (
    <div className="notificationDrawer">
        <TransitionGroup>
            {notifications &&
        notifications.length > 0 &&
        notifications.map((notification) =>
            notification.messageType === 'SUCCESS' ? (
                <Fade key={notification.id}>
                    <SuccessNotification message={notification.message} shadow />
                </Fade>
            ) : (
                <Fade key={notification.id}>
                    <ErrorNotification message={notification.message} shadow />
                </Fade>
            )
        )}
            {purchases && purchases.length > 0 && (
                <Fade>
                    <PurchaseNotification shadow purchases={purchases} />
                </Fade>
            )}
        </TransitionGroup>
    </div>
);

const mapStateToProps = (state) => {
    return {
        notifications: state.notification.notifications,
        purchases: state.notification.purchasedItems
    };
};

export default connect(mapStateToProps)(NotificationDrawer);

