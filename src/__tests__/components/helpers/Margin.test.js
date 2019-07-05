import { shallow } from 'enzyme';
import Margin from '../../../components/helpers/Margin';
import React from 'react';

describe.only('<Margin />', () => {
    it('should match snapshot', () => {
        const cmpnt = shallow(<Margin margin={20}>HelloWorld</Margin>);
        expect(cmpnt).toMatchSnapshot();
    });
});
