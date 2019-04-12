import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configure, shallow } from 'enzyme';
import { store } from '../../store';
import Adapter from 'enzyme-adapter-react-16';
import LoginPage from './LoginPage';
import React from 'react';

configure({ adapter: new Adapter() });

/*
Here we pass in the Redux store and a memory router,
 to test the functionality of the login page.
*/

describe('<LoginPage />', () => {
    it('renders correctly when not authenticated', () => {
        const cmpnt = shallow(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage authenticated={false} />
                </MemoryRouter>
            </Provider>
        );
        expect(cmpnt).toMatchSnapshot();
    });
    it('renders correctly when authenticated', () => {
        const cmpnt = shallow(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage authenticated={true} />
                </MemoryRouter>
            </Provider>
        );
        expect(cmpnt).toMatchSnapshot();
    });
});
