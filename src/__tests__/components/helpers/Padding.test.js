import Padding from '../../../components/helpers/Padding';
import React from 'react';
import renderer from 'react-test-renderer';

describe.only('<Padding />', () => {
    it('should match snapshot', () => {
        const cmpnt = renderer.create(<Padding />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
