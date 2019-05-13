import { addProductToNotification, errorMessage, successMessage } from '../reducers/notificationReducer';
import notificationReducer from '../reducers/notificationReducer';

describe('notificationReducer', () => {
    it('successMessage-action changes state', () => {
        const state = [];
        const action = successMessage();

        const newState = notificationReducer(state, action);

        expect(Object.keys(newState).length).toBeFalsy();
    });

    it('errorMessage-action changes state', () => {
        const state = [];
        const action = errorMessage();

        const newState = notificationReducer(state, action);

        expect(Object.keys(newState).length).toBeFalsy();
    });

    it('addProductToNotification-action changes state', () => {
        const state = { purchasedItems: [] };
        const action = addProductToNotification({ barcode: 111 });

        const newState = notificationReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });
});
