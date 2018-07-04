import { shallow } from 'enzyme';
import React from 'react';
import Shadow from './Shadow';
import renderer from 'react-test-renderer';

describe.only('<Shadow />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<Shadow />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
