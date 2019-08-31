import React from 'react';
import Shadow from '../../../components/helpers/Shadow';
import renderer from 'react-test-renderer';

describe('<Shadow />', () => {
    it('should match snapshot', () => {
        const cmpnt = renderer.create(<Shadow />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
