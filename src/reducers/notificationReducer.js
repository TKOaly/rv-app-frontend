import uuidv1 from 'node-uuid';

export const notificationActions = {
    MESSAGE: 'MESSAGE',
    CLEAR_MESSAGE: 'CLEAR_MESSAGE',
    ADD_PRODUCT_TO_PURCHASE: 'ADD_PRODUCT_TO_PURCHASE',
    CLEAR_PURCHASES: 'CLEAR_PURCHASES'
};

export const notificationTypes = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

export const initialState = {
    notifications: [],
    purchasedItems: [],
    lastPurchaseNotificationId: null
};

const getId = () => uuidv1();

/**
 * Fires a success notification.
 * @param {string} message
 * @param {number} duration
 */
export const successMessage = (message, duration = 4000) => {
    const id = getId();
    return async (dispatch) => {
        dispatch({
            id,
            type: notificationActions.MESSAGE,
            messageType: notificationTypes.SUCCESS,
            message
        });
        await wait(duration);
        dispatch({
            type: notificationActions.CLEAR_MESSAGE,
            id
        });
    };
};

/**
 * Fires an error notification.
 * @param {string} message
 * @param {number} duration
 */
export const errorMessage = (message, duration = 4000) => {
    const id = getId();
    return async (dispatch) => {
        dispatch({
            id,
            type: notificationActions.MESSAGE,
            messageType: notificationTypes.ERROR,
            message
        });
        await wait(duration);
        dispatch({
            type: notificationActions.CLEAR_MESSAGE,
            id
        });
    };
};

/**
 * Adds an item to the product purchase notification.
 * @param {object} product
 */
export const addProductToNotification = (product, count) => {
    return async (dispatch) => {
        const id = getId();
        dispatch({
            type: notificationActions.ADD_PRODUCT_TO_PURCHASE,
            id,
            data: { product, count }
        });
        await wait(2500);
        dispatch({
            type: notificationActions.CLEAR_PURCHASES,
            id
        });
    };
};

/**
 * Returns a Promise that resolves when the predefined duration is set.
 * @param {number} duration
 */
const wait = (duration) => new Promise((resolve) => setTimeout(() => resolve(), duration));

/**
 * Notification reducer.
 * @param {object} state
 * @param {object} action
 */
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case notificationActions.MESSAGE: {
            return Object.assign({}, state, {
                notifications: [
                    ...state.notifications,
                    {
                        id: action.id,
                        messageType: action.messageType,
                        message: action.message
                    }
                ]
            });
        }
        case notificationActions.CLEAR_MESSAGE: {
            const newNotifications = state.notifications.filter((notification) => notification.id !== action.id);
            return Object.assign({}, state, {
                notifications: [...newNotifications]
            });
        }
        case notificationActions.ADD_PRODUCT_TO_PURCHASE: {
            // Product
            const sameProductPurchase = state.purchasedItems.find(
                (purchase) => purchase.product.barcode === action.data.product.barcode
            );

            if (!sameProductPurchase) {
                return Object.assign({}, state, {
                    purchasedItems: [...state.purchasedItems, action.data],
                    lastPurchaseNotificationId: action.id
                });
            } else {
                // Product exists, increment amount
                const purchases = state.purchasedItems.map((purchase) => {
                    if (purchase.product.barcode !== action.data.product.barcode) {
                        return purchase;
                    } else {
                        return Object.assign({}, purchase, {
                            count: purchase.count + action.data.count
                        });
                    }
                });
                return Object.assign({}, state, {
                    purchasedItems: purchases,
                    lastPurchaseNotificationId: action.id
                });
            }
        }
        case notificationActions.CLEAR_PURCHASES: {
            /* Only clear purchase notifications if it is called for the last notification. */
            if (action.id === state.lastPurchaseNotificationId) {
                return Object.assign({}, state, {
                    purchasedItems: [],
                    lastPurchaseNotificationId: null
                });
            } else {
                return state;
            }
        }
        default:
            return state;
    }
};

export default notificationReducer;
