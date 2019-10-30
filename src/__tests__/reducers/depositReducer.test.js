import { resetAmount, setAmountText, toggleConfirmationVisibility } from '../../reducers/depositReducer';
import depositReducer from '../../reducers/depositReducer';

describe('depositReducer', () => {
    it('toggleConfirmationVisibility-action changes state', () => {
        const state = {
            confirmationVisibility: false
        };
        const action = toggleConfirmationVisibility(true);

        const newState = depositReducer(state, action);

        expect(newState.confirmationVisibility).toBeTruthy();
    });

    it('setAmountText-action changes state', () => {
        const state = {
            depositAmountText: ''
        };
        const action = setAmountText('101');

        const newState = depositReducer(state, action);

        expect(newState.depositAmountText).toBe('101');
    });

    it('resetAmount-action changes state', () => {
        const state = {
            depositAmountText: '155'
        };
        const action = resetAmount();

        const newState = depositReducer(state, action);

        expect(newState.depositAmountText).toBe('');
    });
});
