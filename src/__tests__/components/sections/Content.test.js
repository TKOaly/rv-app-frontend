import { shallow } from 'enzyme';
import Content from '../../../components/sections/Content';
import React from 'react';

describe('<Content/>', () => {
    it('should match snapshot', () => {
        // Shallow for now
        const wrapper = shallow(<Content/>);
        expect(wrapper).toMatchSnapshot();
    });
});
