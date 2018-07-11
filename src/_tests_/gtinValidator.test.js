import gtinValidator from '../services/gtinValidator';

describe('gtinValidator', () => {
    it('accepts correct GTIN-8', () => {
        expect(gtinValidator.validateGtin('57402772')).toBe(true);
    });

    it('accepts correct GTIN-12', () => {
        expect(gtinValidator.validateGtin('615104266964')).toBe(true);
    });

    it('accepts correct GTIN-13', () => {
        expect(gtinValidator.validateGtin('6416453036734')).toBe(true);
    });

    it('accepts correct GTIN-14', () => {
        expect(gtinValidator.validateGtin('36412500070189')).toBe(true);
    });

    it('rejects invalid GTIN-8', () => {
        expect(gtinValidator.validateGtin('39812375')).toBe(false);
    });

    it('rejects invalid GTIN-12', () => {
        expect(gtinValidator.validateGtin('696682366288')).toBe(false);
    });

    it('rejects invalid GTIN-13', () => {
        expect(gtinValidator.validateGtin('7184618930209')).toBe(false);
    });

    it('rejects invalid GTIN-14', () => {
        expect(gtinValidator.validateGtin('68164818851434')).toBe(false);
    });

    it('rejects GTIN of invalid length', () => {
        expect(gtinValidator.validateGtin('1309830862')).toBe(false);
    });
});
