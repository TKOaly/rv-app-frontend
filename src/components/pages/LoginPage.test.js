import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginPage from './LoginPage';
import React from 'react';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });

/*
Here we pass in the Redux store and a memory router,
 to test the functionality of the login page.
*/

jest.mock('react-dom', () => ({
    findDOMNode: () => ({
        focus: () => {}
    })
}));

describe('<LoginPage />', () => {
    it('renders correctly when not authenticated', async () => {
        const { store } = await import('../../store');
        const cmpnt = renderer
            .create(
                <Provider store={store}>
                    <MemoryRouter>
                        <LoginPage authenticated={false} />
                    </MemoryRouter>
                </Provider>
            )
            .toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
    it('renders correctly when authenticated', async () => {
        const { store } = await import('../../store');
        const cmpnt = renderer
            .create(
                <Provider store={store}>
                    <MemoryRouter>
                        <LoginPage authenticated={true} />
                    </MemoryRouter>
                </Provider>
            )
            .toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
