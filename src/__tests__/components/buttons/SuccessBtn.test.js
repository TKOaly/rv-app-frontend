import { mount, shallow } from 'enzyme';
import Loader from '../../../components/loaders/Loader';
import React from 'react';
import SuccessBtn from '../../../components/buttons/SuccessBtn';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

describe('<SuccessBtn />', () => {
    it('should render text correctly', () => {
        const successBtn = shallow(<SuccessBtn>Hello world</SuccessBtn>);
        const contentDiv = successBtn.find('.btnContent');
        expect(contentDiv.text()).toEqual('Hello world');
    });

    it('should match snapshot', () => {
        const cmpnt = renderer.create(<SuccessBtn>Hello world</SuccessBtn>).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });

    it('should show loader correctly', () => {
        const successBtn = shallow(<SuccessBtn loader />);
        expect(successBtn.contains(<Loader />)).toBe(true);
    });

    it('should fire an event when button is clicked', () => {
        const mockHandler = sinon.spy();

        const successBtn = mount(<SuccessBtn onClick={mockHandler} />);

        expect(mockHandler.notCalled).toBe(true);
        successBtn.simulate('click');
        expect(mockHandler.calledOnce).toBe(true);
    });
});
