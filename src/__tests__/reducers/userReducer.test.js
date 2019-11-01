import { historyActions } from '../../reducers/historyReducer';
import {
    increaseBalance,
    initialState,
    resetUserData,
    setBalance,
    setUserData,
    userActions
} from '../../reducers/userReducer';
import { mockStore } from '../../mockStore';
import { notificationActions, notificationTypes } from '../../reducers/notificationReducer';
import axios from 'axios';
import userReducer from '../../reducers/userReducer';

jest.mock('axios');

describe('userReducer', () => {
    it('Should reset user data', () => {
        const state = {
            ...initialState,
            username: 'Hello',
            fullName: 'Hello World',
            email: 'hello@world.com',
            moneyBalance: 128
        };
        const action = resetUserData();

        const newState = userReducer(state, action);

        expect(newState.username).toBe('');
        expect(newState.fullName).toBe('');
        expect(newState.email).toBe('');
        expect(newState.moneyBalance).toBe(0);
    });

    it('Should set user data', () => {
        const state = { ...initialState };
        const action = setUserData({
            username: 'Hello',
            fullName: 'Hello World',
            email: 'hello@world.com',
            moneyBalance: 12
        });

        expect(state.username).toBe('');
        expect(state.fullName).toBe('');
        expect(state.email).toBe('');
        expect(state.moneyBalance).toBe(0);

        const newState = userReducer(state, action);

        expect(newState.username).toBe('Hello');
        expect(newState.fullName).toBe('Hello World');
        expect(newState.email).toBe('hello@world.com');
        expect(newState.moneyBalance).toBe(12);
    });

    it('Should increase user balance', async () => {
        const response = {
            data: {
                accountBalance: 9001,
                deposit: {}
            }
        };
        axios.post.mockReturnValueOnce(response);

        const state = {
            ...initialState
        };
        const store = mockStore(state);

        await store.dispatch(increaseBalance('', 9001));

        const actions = store.getActions();
        expect(actions.length).toBe(3);
        expect(actions[0].type).toBe(userActions.SET_BALANCE);
        expect(actions[0].balance).toBe(9001);
        expect(actions[1].type).toBe(historyActions.ADD_DEPOSIT);
        expect(actions[2].type).toBe(notificationActions.MESSAGE);
        expect(actions[2].messageType).toBe(notificationTypes.SUCCESS);
        expect(actions[2].message).toBe('Deposited into RV-account 90.01 €');
    });

    it('Should set user balance', () => {
        const state = { ...initialState };
        const action = setBalance(255);

        expect(state.moneyBalance).toBe(0);
        const newState = userReducer(state, action);
        expect(newState.moneyBalance).toBe(255);
    });
});
