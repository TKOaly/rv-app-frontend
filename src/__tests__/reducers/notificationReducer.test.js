import {
    addProductToNotification,
    errorMessage,
    notificationActions,
    notificationTypes,
    successMessage
} from '../../reducers/notificationReducer';
import { mockStore } from '../../mockStore';
import notificationReducer from '../../reducers/notificationReducer';

describe('notificationReducer', () => {
    it('successMessage action dispatches correct actions', async () => {
        const store = mockStore({
            notifications: [],
            purchasedItems: [],
            lastPurchaseNotificationId: null
        });

        const action = successMessage('Hello world', 100);

        await store.dispatch(action);
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(notificationActions.MESSAGE);
        expect(actions[0].messageType).toBe(notificationTypes.SUCCESS);
        expect(actions[0].message).toBe('Hello world');
        expect(actions[1].type).toBe(notificationActions.CLEAR_MESSAGE);
    });

    it('successMessage action modifies state correctly', async () => {
        const state = {
            notifications: [],
            purchasedItems: [],
            lastPurchaseNotificationId: null
        };

        const action = {
            id: '1',
            type: notificationActions.MESSAGE,
            messageType: notificationTypes.SUCCESS,
            message: 'Hello World'
        };

        const newState = notificationReducer(state, action);
        expect(newState.notifications.length).toBe(1);
        expect(newState.notifications[0].messageType).toBe(
            notificationTypes.SUCCESS
        );
        expect(newState.notifications[0].message).toBe('Hello World');
        expect(newState.notifications[0].id).toBe('1');
    });

    it('errorMessage action dispatches correct actions', async () => {
        const store = mockStore({
            notifications: [],
            purchasedItems: [],
            lastPurchaseNotificationId: null
        });

        const action = errorMessage('Hello world', 100);

        await store.dispatch(action);
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(notificationActions.MESSAGE);
        expect(actions[0].messageType).toBe(notificationTypes.ERROR);
        expect(actions[0].message).toBe('Hello world');
        expect(actions[1].type).toBe(notificationActions.CLEAR_MESSAGE);
    });

    it('addProductToNotification action modifies state correctly', () => {
        const state = {
            notifications: [],
            purchasedItems: [],
            lastPurchaseNotificationId: null
        };

        const action = {
            type: notificationActions.ADD_PRODUCT_TO_PURCHASE,
            id: '1',
            data: {
                product: {
                    barcode: 111
                },
                count: 4
            }
        };

        const newState = notificationReducer(state, action);
        expect(newState.purchasedItems.length).toBe(1);
        expect(newState.purchasedItems[0].product.barcode).toBe(111);
        expect(newState.purchasedItems[0].count).toBe(4);
    });

    it('addProductToNotification action dispatches correct actions', async () => {
        const store = mockStore({
            notifications: [],
            purchasedItems: [],
            lastPurchaseNotificationId: null
        });

        const action = addProductToNotification({ barcode: 111 }, 10);

        await store.dispatch(action);
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(notificationActions.ADD_PRODUCT_TO_PURCHASE);
        expect(actions[0].data.count).toBe(10);
        expect(actions[0].data.product.barcode).toBe(111);
        expect(actions[1].type).toBe(notificationActions.CLEAR_PURCHASES);
    });
});
