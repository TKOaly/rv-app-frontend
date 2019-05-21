import { shallow } from 'enzyme';
import Loader from '../components/loaders/Loader';
import React from 'react';
import SuccessBtn from '../components/buttons/SuccessBtn';
import renderer from 'react-test-renderer';

describe.only('<SuccessBtn />', () => {
    it('renders text correctly', () => {
        const data = {
            text: 'Hello world'
        };

        const successBtnComponent = shallow(<SuccessBtn>{data.text}</SuccessBtn>);
        console.log(successBtnComponent.debug());
        const contentDiv = successBtnComponent.find('.btnContent');
        expect(contentDiv.text()).toContain(data.text);
        const cmpnt = renderer.create(<SuccessBtn>{data.text}</SuccessBtn>).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });

    it('shows loader correctly', () => {
        const successBtnComponent = shallow(<SuccessBtn loader={true} />);
        console.log(successBtnComponent.debug());
        expect(successBtnComponent.contains(<Loader />)).toBe(true);
        const cmpnt = renderer.create(<SuccessBtn loader />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });

    it('onClick event works correctly', () => {
        const data = {
            text: 'Hello world'
        };

        const mockHandler = jest.fn();

        const successBtnComponent = shallow(<SuccessBtn onClick={mockHandler} />);

        const cmpnt = renderer.create(<SuccessBtn onClick={mockHandler} />).toJSON();
        expect(cmpnt).toMatchSnapshot();

        const button = successBtnComponent.find('button');

        expect(mockHandler.mock.calls.length).toBe(0);
        button.simulate('click');
        expect(mockHandler.mock.calls.length).toBe(1);
    });
});
