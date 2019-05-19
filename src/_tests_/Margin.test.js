import { shallow } from 'enzyme';
import Margin from '../components/helpers/Margin';
import React from 'react';
import renderer from 'react-test-renderer';

describe.only('<Margin />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<Margin margin={20}>HelloWorld</Margin>).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
