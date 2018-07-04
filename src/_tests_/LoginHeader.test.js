import Enzyme from 'enzyme';
import LoginHeader from '../components/sections/LoginHeader';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginHeader />, div);
    const cmpnt = renderer.create(<LoginHeader />).toJSON();
    expect(cmpnt).toMatchSnapshot();
});
