import { focusPasswordField, focusUsernameField, handleInputEvent, reset } from '../reducers/loginReducer';
import loginReducer from '../reducers/loginReducer';

describe('loginReducer', () => {
    it('reset-action changes state', () => {
        const state = [];
        const action = reset();

        const newState = loginReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('handleInputEvent-action changes state', () => {
        const state = [];
        const action = handleInputEvent({ target: { value: 1 } });

        const newState = loginReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('focusPasswordField-action changes state', () => {
        const state = [];
        const action = focusPasswordField();

        const newState = loginReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('focusUsernameField-action changes state', () => {
        const state = [];
        const action = focusUsernameField();

        const newState = loginReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });
});
