import Loader from '../../../components/loaders/Loader';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<Loader />', () => {
    it('should match snapshot', () => {
        const cmpnt = renderer.create(<Loader />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
