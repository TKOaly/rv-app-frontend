import axios from 'axios';

const getDepositHistory = async (token) => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/depositHistory`, {
        headers: { Authorization: 'Bearer ' + token }
    });
    return res.data.deposits;
};

const getPurchaseHistory = async (token) => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/purchaseHistory`, {
        headers: { Authorization: 'Bearer ' + token }
    });
    return res.data.purchases;
};

export default {
    getDepositHistory,
    getPurchaseHistory
};
