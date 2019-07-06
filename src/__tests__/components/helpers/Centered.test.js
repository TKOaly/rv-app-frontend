import Centered from '../../../components/helpers/Centered';
import React from 'react';
import renderer from 'react-test-renderer';

describe.only('<Centered />', () => {
    it('should match snapshot', () => {
        const cmpnt = renderer.create(<Centered />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
