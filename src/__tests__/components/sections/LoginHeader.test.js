import LoginHeader from '../../../components/sections/LoginHeader';
import React from 'react';
import renderer from 'react-test-renderer';

describe('<LoginHeader/>', () => {
    it('should match snapshot', () => {
        const cmpnt = renderer.create(<LoginHeader />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});

