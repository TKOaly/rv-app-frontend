// Resources for understanding barcodes and GTIN:
// https://www.gtin.info/
// https://www.gs1.org/services/how-calculate-check-digit-manually

const validateGtin = (gtin) => {
    // Allow only numeric strings of length 8, 12, 13 or 14.
    if (!gtin.match(/^\d+$/) || ![8, 12, 13, 14].includes(gtin.length)) {
        return false;
    }
    // Make GTIN 14 characters in length.
    gtin = gtin.padStart(14, '0');

    // Calculate sum of digits where every other digit is multiplied by 3.
    let sum = 0;
    for (let i = 0; i < 13; i++) {
        const digit = parseInt(gtin[i], 10);

        if (i % 2 === 0) {
            sum += digit * 3;
        } else {
            sum += digit;
        }
    }

    // Check if last digit matches the checksum.
    const lastDigit = parseInt(gtin[13], 10);
    const checksum = (10 - sum % 10) % 10;
    return lastDigit === checksum;
};

export default { validateGtin };
