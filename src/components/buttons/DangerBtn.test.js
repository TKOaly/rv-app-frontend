import { shallow } from 'enzyme';
import DangerBtn from './DangerBtn';
import Loader from '../loaders/Loader';
import React from 'react';
import renderer from 'react-test-renderer';

describe.only('<DangerBtn />', () => {
    it('renders text correctly', () => {
        const data = {
            text: 'Hello world'
        };

        const dangerBtnComponent = shallow(<DangerBtn>{data.text}</DangerBtn>);
        console.log(dangerBtnComponent.debug());
        const contentDiv = dangerBtnComponent.find('.btnContent');
        expect(contentDiv.text()).toContain(data.text);

        const cmpnt = renderer.create(<DangerBtn>{data.text}</DangerBtn>).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });

    it('shows loader correctly', () => {
        const dangerBtnComponent = shallow(<DangerBtn loader />);
        console.log(dangerBtnComponent.debug());
        expect(dangerBtnComponent.contains(<Loader />)).toBe(true);
        const cmpnt = renderer.create(<DangerBtn loader />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });

    it('onClick event works correctly', () => {
        const data = {
            text: 'Hello world'
        };

        const mockHandler = jest.fn();

        const dangerBtnComponent = shallow(<DangerBtn onClick={mockHandler} />);

        const button = dangerBtnComponent.find('button');

        const cmpnt = renderer.create(<DangerBtn onClick={mockHandler} />).toJSON();
        expect(cmpnt).toMatchSnapshot();

        expect(mockHandler.mock.calls.length).toBe(0);
        button.simulate('click');
        expect(mockHandler.mock.calls.length).toBe(1);
    });
});
