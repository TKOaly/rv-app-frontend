const validateEan = (ean) => {
    ean = ean.toString();
    // Allow only numbers
    if (ean.match('^[0-9]+$') === null) {
        return false;
    }
    // Make EAN 14 characters in length
    switch (ean.length) {
        case 8:
            ean = '000000' + ean;
            break;
        case 12:
            ean = '00' + ean;
            break;
        case 13:
            ean = '0' + ean;
            break;
        case 14:
            break;
        default:
            return false;
    }

    // Start calculating checksum
    const a = [];
    a[0] = parseInt(ean[0], 10) * 3;
    a[1] = parseInt(ean[1], 10);
    a[2] = parseInt(ean[2], 10) * 3;
    a[3] = parseInt(ean[3], 10);
    a[4] = parseInt(ean[4], 10) * 3;
    a[5] = parseInt(ean[5], 10);
    a[6] = parseInt(ean[6], 10) * 3;
    a[7] = parseInt(ean[7], 10);
    a[8] = parseInt(ean[8], 10) * 3;
    a[9] = parseInt(ean[9], 10);
    a[10] = parseInt(ean[10], 10) * 3;
    a[11] = parseInt(ean[11], 10);
    a[12] = parseInt(ean[12], 10) * 3;
    const sum = a.reduce((prev, next) => prev + next, 0);

    return (10 - sum % 10) % 10 === parseInt(ean[13], 10);
};

export default { validateEan };
