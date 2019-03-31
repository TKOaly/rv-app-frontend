import axios from 'axios';
/* Product service */

const buyProduct = async (barcode, quantity, token) => {
    const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/products/${barcode}/purchase`,
        {
            count: quantity
        },
        {
            headers: { Authorization: 'Bearer ' + token }
        }
    );
    return res.data;
};

const getAllProducts = async (token) => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/products`, {
        headers: { Authorization: 'Bearer ' + token }
    });
    return res.data.products;
};

const getAllCategories = async (token) => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/categories`, {
        headers: { Authorization: 'Bearer ' + token }
    });
    return res.data.categories;
};

export default { buyProduct, getAllProducts, getAllCategories };
