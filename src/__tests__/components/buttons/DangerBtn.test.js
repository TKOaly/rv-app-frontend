import { mount, shallow } from 'enzyme';
import DangerBtn from '../../../components/buttons/DangerBtn';
import Loader from '../../../components/loaders/Loader';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

describe('<DangerBtn />', () => {
    it('should render text correctly', () => {
        const dangerBtnComponent = shallow(<DangerBtn>Hello world</DangerBtn>);
        const contentDiv = dangerBtnComponent.find('.btnContent');
        expect(contentDiv.text()).toContain('Hello world');
    });

    it('should match snapshot', () => {
        const cmpnt = renderer.create(<DangerBtn>Hello world</DangerBtn>).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });

    it('should show loader correctly', () => {
        const dangerBtnComponent = shallow(<DangerBtn loader />);
        expect(dangerBtnComponent.contains(<Loader />)).toBe(true);
    });

    it('should fire an event when button is clicked', () => {
        const mockHandler = sinon.spy();

        const dangerBtnComponent = mount(<DangerBtn onClick={mockHandler} />);

        expect(mockHandler.notCalled).toBe(true);
        dangerBtnComponent.simulate('click');
        expect(mockHandler.calledOnce).toBe(true);
    });
});
