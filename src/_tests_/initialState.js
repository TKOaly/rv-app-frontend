/*
    Initial state of the application for mocking React Redux
*/
import { initialState as authentication } from '../reducers/authenticationReducer';
import { formReducer as form } from 'redux-form';
import { initialState as modal } from '../reducers/modalReducer';
import { initialState as notification } from '../reducers/notificationReducer';
import { initialState as register } from '../reducers/registerReducer';

const initialState = {
    notification,
    authentication,
    modal,
    register,
    form
};

export default initialState;
