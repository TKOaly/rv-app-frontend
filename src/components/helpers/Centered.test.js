import Centered from './Centered';
import React from 'react';
import renderer from 'react-test-renderer';

describe.only('<Centered />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<Centered />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
