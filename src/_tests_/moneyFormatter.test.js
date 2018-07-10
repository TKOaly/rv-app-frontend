import moneyFormatter from '../services/moneyFormatter';

describe('moneyFormatter', () => {
    it('converts positive cents into string', () => {
        expect(moneyFormatter.centsToString(402)).toEqual('4.02');
    });

    it('converts less than 10 cents into string', () => {
        expect(moneyFormatter.centsToString(8)).toEqual('0.08');
    });

    it('converts negative cents into string', () => {
        expect(moneyFormatter.centsToString(-2954)).toEqual('-29.54');
    });

    it('converts more than -10 negative cents into string', () => {
        expect(moneyFormatter.centsToString(-2)).toEqual('-0.02');
    });

    it('converts positive string into cents', () => {
        expect(moneyFormatter.stringToCents('4.02')).toEqual(402);
    });

    it('converts less than 10 cent string into cents', () => {
        expect(moneyFormatter.stringToCents('0.08')).toEqual(8);
    });

    it('converts negative string into cents', () => {
        expect(moneyFormatter.stringToCents('-29.54')).toEqual(-2954);
    });

    it('converts more than -10 negative cent string into cents', () => {
        expect(moneyFormatter.stringToCents('-0.02')).toEqual(-2);
    });
});
