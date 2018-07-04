import Enzyme from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import TopBalanceUsers from '../components/sections/TopBalanceUsers';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TopBalanceUsers />, div);
    const cmpnt = renderer.create(<TopBalanceUsers />).toJSON();
    expect(cmpnt).toMatchSnapshot();
});
