import { loggedIn, loggingIn, loginFailed, logout } from '../reducers/authenticationReducer';
import authenticationReducer from '../reducers/authenticationReducer';

describe('authenticationReducer', () => {
    it('logout-action changes state', () => {
        const state = [];
        const action = logout();

        const newState = authenticationReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('loggingIn-action changes state', () => {
        const state = { isLoggingIn: false };
        const action = loggingIn();

        const newState = authenticationReducer(state, action);
        expect(newState.isLoggingIn).toBeTruthy();
    });

    it('loggedIn-action changes state', () => {
        const state = { loggedIn: false };
        const action = loggedIn('token_test');

        const newState = authenticationReducer(state, action);
        expect(newState.loggedIn).toBeTruthy();
        expect(newState.access_token).toBe('token_test');
    });

    it('loginFailed-action changes state', () => {
        const state = {
            loggingIn: true,
            access_token: 'test'
        };
        const action = loginFailed();

        const newState = authenticationReducer(state, action);

        expect(newState.loggedIn).toBeFalsy();
        expect(newState.isLoggingIn).toBeFalsy();
        expect(newState.access_token).toBe('');
    });
});
