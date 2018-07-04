import { decreaseBalance, increaseBalance, resetUserData, setBalance, setUserData } from '../reducers/userReducer';
import userReducer from '../reducers/userReducer';

describe('userReducer', () => {
    it('resetUserData-action changes state', () => {
        const state = [];
        const action = resetUserData();

        const newState = userReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('setUserData-action changes state', () => {
        const state = [];
        const action = setUserData();

        const newState = userReducer(state, action);

        expect(Object.keys(newState).length).toBeFalsy();
    });

    it('increaseBalance-action changes state', () => {
        const state = [];
        const action = increaseBalance();

        const newState = userReducer(state, action);

        expect(Object.keys(newState).length).toBeFalsy();
    });

    it('decreaseBalance-action changes state', () => {
        const state = [];
        const action = decreaseBalance();

        const newState = userReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('setBalance-action changes state', () => {
        const state = [];
        const action = setBalance();

        const newState = userReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });
});
