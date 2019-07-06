/*
    Initial state of the application for mocking React Redux
*/
import { store } from '../reducers/store';

const initialState = {
    ...store.getState()
};

export default initialState;
