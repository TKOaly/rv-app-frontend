/* User service */

import axios from 'axios';

/**
 * Register new user with backend to database
 * @param {object} newUser
 */
const registerUser = async (newUser) => {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/register`, {
        username: newUser.username,
        password: newUser.password,
        fullName: newUser.fullName,
        email: newUser.email
    });
    return res.data.user;
};

/**
 * Fetches user information from backend.
 * @param {string} token access token
 */
const getUser = async (token) => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user`, {
        headers: { Authorization: 'Bearer ' + token }
    });
    return res.data.user;
};

/**
 * Authenticates the user with back-end. Returns an access token.
 * @param {object} user
 */
const authenticate = async (user) => {
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/authenticate`, {
        username: user.username,
        password: user.password
    });
    return res.data.accessToken;
};

/**
 * Increases a user's account balance.
 * @param {string} token access token
 * @param {integer} amount amount to increase
 */
const deposit = async (token, amount) => {
    const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/deposit`,
        {
            amount: amount
        },
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    );
    return res.data.accountBalance;
};

export default {
    getUser,
    deposit,
    authenticate,
    registerUser
};
