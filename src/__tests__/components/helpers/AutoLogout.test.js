import { AutoLogout } from '../../../components/helpers/AutoLogout';
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

describe('<AutoLogout />', () => {
    let addEventListenerMock, removeEventListenerMock;
    beforeEach(() => {
        addEventListenerMock = sinon.stub(document, 'addEventListener');
        removeEventListenerMock = sinon.stub(document, 'removeEventListener');
    });
    afterEach(() => {
        removeEventListenerMock.restore();
        addEventListenerMock.restore();
    });
    it('should match snapshot', () => {
        const cmpnt = renderer.create(<AutoLogout />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
    it('should call addEventListener() twice when mounting', () => {
        expect(addEventListenerMock.notCalled).toBe(true);
        mount(<AutoLogout />);
        expect(addEventListenerMock.calledTwice).toBe(true);
    });
    it('should call removeEventListener() twice when unmounting', () => {
        expect(removeEventListenerMock.notCalled).toBe(true);
        const cmpnt = mount(<AutoLogout />);
        cmpnt.unmount();
        expect(removeEventListenerMock.calledTwice).toBe(true);
    });
    it('should call addEventListener() and removeEventListener() twice during the components lifetime', () => {
        expect(removeEventListenerMock.notCalled).toBe(true);
        expect(addEventListenerMock.notCalled).toBe(true);

        const cmpnt = mount(<AutoLogout timerMs={1000} />);
        cmpnt.unmount();

        expect(addEventListenerMock.calledTwice).toBe(true);
        expect(removeEventListenerMock.calledTwice).toBe(true);
    });
    it('should call logUserOut() after waiting for a period of time', () => {
        const clock = sinon.useFakeTimers();
        const logoutSpy = sinon.spy();

        expect(logoutSpy.notCalled).toBe(true);

        mount(<AutoLogout logUserOut={logoutSpy} timerMs={500} />);

        clock.tick(499);
        expect(logoutSpy.notCalled).toBe(true);

        clock.tick(1);
        expect(logoutSpy.callCount).toBe(1);

        clock.restore();
    });

    it('should not call logUserOut() after unmounting', () => {
        const clock = sinon.useFakeTimers();
        const logoutSpy = sinon.spy();

        expect(logoutSpy.notCalled).toBe(true);

        const cmpnt = mount(<AutoLogout logUserOut={logoutSpy} timerMs={500} />);

        clock.tick(450);

        expect(logoutSpy.notCalled).toBe(true);
        cmpnt.unmount();

        clock.tick(50);
        expect(logoutSpy.notCalled).toBe(true);

        clock.restore();
    });

    /*
    it('should reset timer when pressing a key', () => {
        removeEventListenerMock.restore();
        addEventListenerMock.restore();

        const clock = sinon.useFakeTimers();
        const logoutSpy = sinon.spy();

        const cmpnt = mount(<div className="wrap"><AutoLogout logUserOut={logoutSpy} timerMs={410} /></div>);

        clock.tick(400);

        expect(logoutSpy.notCalled).toBe(true);

        cmpnt.find('.wrap').simulate('keydown', { key: 'a' }); // This should add 410ms to the current timer

        clock.tick(50);

        expect(logoutSpy.notCalled).toBe(true);

        clock.tick(360);

        expect(logoutSpy.calledOnce).toBe(true);

        clock.restore();
    });*/
});
