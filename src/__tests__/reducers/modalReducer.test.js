import { closeModal, showModal } from '../../reducers/modalReducer';
import modalReducer from '../../reducers/modalReducer';

describe('modalReducer', () => {
    it('showModal-action changes state', () => {
        const state = {
            modalVisible: false,
            modalContent: null,
            props: null
        };
        const action = showModal(undefined, {hello: true});

        const newState = modalReducer(state, action);

        expect(newState.props.hello).toBeTruthy();
        expect(newState.modalContent).toBe(undefined);
        expect(newState.modalVisible).toBeTruthy();
    });

    it('closeModal-action changes state', () => {
        const state = {
            modalVisible: true,
            modalContent: undefined,
            props: {
                hello: true
            }
        };
        const action = closeModal();

        const newState = modalReducer(state, action);

        expect(newState.props).toBe(null);
        expect(newState.modalContent).toBe(null);
        expect(newState.modalVisible).toBeFalsy();
    });
});
