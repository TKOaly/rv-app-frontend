import authenticationReducer from '../reducers/authenticationReducer';
import { logout, loggingIn, loggedIn, loginFailed } from '../reducers/authenticationReducer';

describe('authenticationReducer', () => {
    it('logout-action changes state', () => {
        const state = [];
        const action = logout();

        const newState = authenticationReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('loggingIn-action changes state', () => {
        const state = [];
        const action = loggingIn();

        const newState = authenticationReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('loggedIn-action changes state', () => {
        const state = [];
        const action = loggedIn();

        const newState = authenticationReducer(state, action);

        expect(Object.keys(newState).length).toBeFalsy();
    });

    it('loginFailed-action changes state', () => {
        const state = [];
        const action = loginFailed();

        const newState = authenticationReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });
});
