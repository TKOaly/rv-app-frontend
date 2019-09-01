const timeStringToOffsetHumanReadable = (dateString) => {
    /* Example: 2018-12-24T00:03:47.577Z -> 2018-12-24 00:05:47 assuming time zone UTC+2 */
    const date = new Date(dateString);

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date
        .getDate()
        .toString()
        .padStart(2, '0');
    const hour = date
        .getHours()
        .toString()
        .padStart(2, '0');
    const minute = date
        .getMinutes()
        .toString()
        .padStart(2, '0');
    const second = date
        .getSeconds()
        .toString()
        .padStart(2, '0');

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
};

export default { timeStringToOffsetHumanReadable };
