import { closeModal, showModal } from '../../reducers/modalReducer';
import modalReducer from '../../reducers/modalReducer';

describe('modalReducer', () => {
    it('showModal-action changes state', () => {
        const state = [];
        const action = showModal();

        const newState = modalReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });

    it('closeModal-action changes state', () => {
        const state = [];
        const action = closeModal();

        const newState = modalReducer(state, action);

        expect(Object.keys(newState).length).toBeTruthy();
    });
});
