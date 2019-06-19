const dateStringToHumanReadable = (dateString) => {
    /* Example: 2018-12-24T00:03:47.577Z -> 2018-12-24 00:03:47 */
    return dateString.slice(0, -5).replace('T', ' ');
};

export default { dateStringToHumanReadable };
