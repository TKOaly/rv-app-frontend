import HeaderBtn from '../../../components/buttons/HeaderBtn';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<HeaderBtn/>', () => {
    it('renders without crashing', () => {
        const cmpnt = renderer.create(<HeaderBtn />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });

});
