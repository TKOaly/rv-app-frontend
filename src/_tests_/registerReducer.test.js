import {
    focusEmailField,
    focusPasswordConfirmField,
    focusPasswordField,
    focusRealnameField,
    handleInputEvent,
    reset,
    setRegistering,
    toggleRegisterVisibility
} from '../reducers/registerReducer';
import RegisterReducer from '../reducers/registerReducer';

describe('RegisterReducer', () => {
    it('action creators return correct actions', () => {
        expect(toggleRegisterVisibility()).toEqual({
            type: 'TOGGLE_REGISTER_VISIBILITY'
        });
        expect(reset()).toEqual({ type: 'RESET_REGISTER' });
        expect(setRegistering()).toEqual({
            loader: true,
            registerPasswordDisabled: true,
            registerPasswordConfirmDisabled: true,
            registerEmailDisabled: true,
            registerRealnameDisabled: true,
            registerUsernameDisabled: true,
            submitDisabled: true,
            type: 'REGISTERING'
        });
        expect(focusEmailField()).toEqual({
            registerStep: 2,
            registerUsernameDisabled: true,
            type: 'FOCUS_EMAIL_FIELD'
        });
        expect(focusRealnameField()).toEqual({
            registerEmailDisabled: true,
            registerPasswordDisabled: true,
            registerStep: 3,
            registerUsernameDisabled: true,
            type: 'FOCUS_REALNAME_FIELD'
        });
        expect(focusPasswordConfirmField()).toEqual({
            registerPasswordConfirmDisabled: false,
            registerPasswordDisabled: true,
            registerStep: 5,
            registerUsernameDisabled: true,
            submitDisabled: false,
            type: 'FOCUS_PASSWORD_CONFIRM_FIELD_REGISTER'
        });
    });
});
