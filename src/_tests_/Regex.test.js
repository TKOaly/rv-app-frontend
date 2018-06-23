import moneyFormatter from './../services/moneyFormatter';

const regex =
    '^d(255(.|,)00|0(.|,)(05|[1-9](0|5))|([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-4])(.|,)[0-9](0|5))$';

describe('Money deposit regular expression', () => {
    it('Allows deposits from 0,05 to 255,00', () => {
        for (let i = 5; i <= 25500; i += 5) {
            const tmpPrice = moneyFormatter.centsToString(i);
            const tmpPrice2 = tmpPrice.replace(',', '.');
            const regexMatch = ('d' + tmpPrice).match(regex);
            const regexMatch2 = ('d' + tmpPrice2).match(regex);
            expect(regexMatch).not.toBe(null);
            expect(regexMatch[1]).toBe(tmpPrice);
            expect(regexMatch2).not.toBe(null);
            expect(regexMatch2[1]).toBe(tmpPrice2);
        }
    });
    it('Doesn\'t allow a 0,00 or 0.00 deposit', () => {
        expect('d0,00'.match(regex)).toBe(null);
        expect('d0,00'.match(regex)).toBe(null);
    });
    it('Doesn\'t allow if d is missing', () => {
        expect('0,00'.match(regex)).toBe(null);
        expect('0.00'.match(regex)).toBe(null);
    });
    it('Doesn\'t allow if the amount is larger than 255,00 or 255.00', () => {
        expect('d255,05'.match(regex)).toBe(null);
        expect('d256,00'.match(regex)).toBe(null);
        expect('d256.00'.match(regex)).toBe(null);
        expect('d255.05'.match(regex)).toBe(null);
    });
    it('Doesn\'t allow if no comma or dot is entered', () => {
        expect('d255'.match(regex)).toBe(null);
        expect('d10'.match(regex)).toBe(null);
    });
});
