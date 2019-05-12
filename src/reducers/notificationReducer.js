import uuidv1 from 'node-uuid';

export const notificationActions = {
    MESSAGE: 'MESSAGE',
    CLEAR_MESSAGE: 'CLEAR_MESSAGE',
    ADD_PRODUCT_TO_PURCHASE: 'ADD_PRODUCT_TO_PURCHASE',
    CLEAR_ITEMS: 'CLEAR_ITEMS'
};

export const notificationTypes = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

export const initialState = {
    notifications: [],
    purchasedItems: [],
    purchaseNotificationTimeout: 2500,
    purchaseNotificationStartTime: null
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
    return {
        type: notificationActions.ADD_PRODUCT_TO_PURCHASE,
        data: { product, count }
    };
};

export const clearProductsFromNotification = () => {
    return {
        type: notificationActions.CLEAR_ITEMS
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
            const purchase = state.purchasedItems.find(
                (purchase) => purchase.product.barcode === action.data.product.barcode
            );

            if (!purchase) {
                return Object.assign({}, state, {
                    purchasedItems: [...state.purchasedItems, action.data],
                    purchaseNotificationStartTime: new Date()
                });
            } else {
                // Product exists, increment amount
                let purchases = Object.assign([], state.purchasedItems);
                purchases = purchases.map((purchase) => {
                    if (purchase.product.barcode !== action.data.product.barcode) {
                        return purchase;
                    } else {
                        return Object.assign({}, purchase, {
                            count: purchase.count + action.data.count
                        });
                    }
                });
                return Object.assign({}, state, {
                    purchasedItems: [...purchases],
                    purchaseNotificationStartTime: new Date()
                });
            }
        }
        case notificationActions.CLEAR_ITEMS:
            return Object.assign({}, state, {
                purchasedItems: [],
                purchaseNotificationStartTime: null
            });
        default:
            return state;
    }
};

export default notificationReducer;
