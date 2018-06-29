const stringToCents = (string) => {
    const matchResult = string.match(/^(-?)(\d+)[.,](\d{2})$/);

    if (matchResult) {
        const sign = matchResult[1];
        const integerPart = matchResult[2];
        const fractionalPart = matchResult[3];

        let cents = parseInt(integerPart, 10) * 100 + parseInt(fractionalPart, 10);
        if (sign === '-') {
            cents *= -1;
        }
        return cents;
    } else {
        return NaN;
    }
};

const centsToString = (cents) => {
    const sign = cents < 0 ? '-' : '';
    const integerPart = Math.abs(Math.trunc(cents / 100)).toString();
    const fractionalPart = Math.abs(cents % 100)
        .toString()
        .padStart(2, '0');

    return sign + integerPart + '.' + fractionalPart;
};

export default { stringToCents, centsToString };
