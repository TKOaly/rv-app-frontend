import { mount, shallow } from 'enzyme';
import BasicBtn from '../../../components/buttons/BasicBtn';
import Loader from '../../../components/loaders/Loader';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

describe('<BasicBtn />', () => {
    it('should render text correctly', () => {
        const basicBtn = shallow(<BasicBtn>Hello world</BasicBtn>);
        const contentDiv = basicBtn.find('.btnContent');
        expect(contentDiv.text()).toContain('Hello world');
    });

    it('should match snapshot', () => {
        const cmpnt = renderer.create(<BasicBtn>Hello world</BasicBtn>).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });

    it('should show loader correctly', () => {
        const dangerBtnComponent = shallow(<BasicBtn loader />);
        expect(dangerBtnComponent.contains(<Loader />)).toBe(true);
    });

    it('should fire an event when button is clicked', () => {
        const mockHandler = sinon.spy();

        const basicBtnComponent = mount(<BasicBtn onClick={mockHandler} />);

        expect(mockHandler.notCalled).toBe(true);
        basicBtnComponent.simulate('click');
        expect(mockHandler.calledOnce).toBe(true);
    });
});
