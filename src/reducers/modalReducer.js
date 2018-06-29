const modalActions = {
    SHOW_MODAL: 'SHOW_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL'
};

export const initialState = {
    modalVisible: false,
    modalContent: null,
    props: null
};

export const showModal = (contentComponent, props) => ({
    type: modalActions.SHOW_MODAL,
    contentComponent,
    props
});

export const closeModal = () => ({
    type: modalActions.CLOSE_MODAL
});

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case modalActions.SHOW_MODAL:
            return Object.assign({}, state, {
                modalVisible: true,
                modalContent: action.contentComponent,
                props: action.props
            });
        case modalActions.CLOSE_MODAL:
            return Object.assign({}, state, {
                modalVisible: false
            });
        default:
            return state;
    }
};

export default modalReducer;
