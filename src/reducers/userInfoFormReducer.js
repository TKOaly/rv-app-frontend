const userInfoFormActions = {
    SET_USERNAME: 'USER_INFO_FORM/SET_USERNAME',
    SET_FULL_NAME: 'USER_INFO_FORM/SET_FULL_NAME',
    SET_EMAIL: 'USER_INFO_FORM/SET_EMAIL',
    SET_PASSWORD: 'USER_INFO_FORM/SET_PASSWORD',
    SET_PASSWORD_AGAIN: 'USER_INFO_FORM/SET_PASSWORD_AGAIN',
    RESET: 'USER_INFO_FORM/RESET'
};

export const initialState = {
    username: '',
    fullName: '',
    email: '',
    password: '',
    passwordAgain: ''
};

export const setUsername = (username) => ({
    type: userInfoFormActions.SET_USERNAME,
    username
});

export const setFullName = (fullName) => ({
    type: userInfoFormActions.SET_FULL_NAME,
    fullName
});

export const setEmail = (email) => ({
    type: userInfoFormActions.SET_EMAIL,
    email
});

export const setPassword = (password) => ({
    type: userInfoFormActions.SET_PASSWORD,
    password
});

export const setPasswordAgain = (passwordAgain) => ({
    type: userInfoFormActions.SET_PASSWORD_AGAIN,
    passwordAgain
});

export const reset = () => ({
    type: userInfoFormActions.RESET
});

const userInfoFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case userInfoFormActions.SET_USERNAME:
            return { ...state, username: action.username };
        case userInfoFormActions.SET_FULL_NAME:
            return { ...state, fullName: action.fullName };
        case userInfoFormActions.SET_EMAIL:
            return { ...state, email: action.email };
        case userInfoFormActions.SET_PASSWORD:
            return { ...state, password: action.password };
        case userInfoFormActions.SET_PASSWORD_AGAIN:
            return { ...state, passwordAgain: action.passwordAgain };
        case userInfoFormActions.RESET:
            return initialState;
        default:
            return state;
    }
};

export default userInfoFormReducer;
