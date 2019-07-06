import { shallow } from 'enzyme';
import React from 'react';
import RegisterForm from '../../../components/forms/RegisterForm';

describe('<RegisterForm/>', () => {
    it('should match snapshot', () => {
        // Shallow for now
        const wrapper = shallow(<RegisterForm/>);
        expect(wrapper).toMatchSnapshot();
    });
});
