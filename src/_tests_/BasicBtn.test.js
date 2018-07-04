import BasicBtn from '../components/buttons/BasicBtn';
import Enzyme from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BasicBtn />, div);
    const cmpnt = renderer.create(<BasicBtn />).toJSON();
    expect(cmpnt).toMatchSnapshot();
});
