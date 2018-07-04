import Enzyme from 'enzyme';
import HeaderBtn from '../components/buttons/HeaderBtn';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HeaderBtn />, div);
    const cmpnt = renderer.create(<HeaderBtn />).toJSON();
    expect(cmpnt).toMatchSnapshot();
});
