import { debounce, throttle } from 'lodash';
import React, { useEffect } from 'react';

export const AutoLogout = ({logUserOut, timerMs = 30 * 1000}) => {
    useEffect(() => {
        const eventThrottleMs = 300;

        // Callback
        const logoutInactiveUser = () => {
            logUserOut();
        };

        const debouncedLogout = debounce(logoutInactiveUser, timerMs);

        // Fire initially
        debouncedLogout();


        const KeyDownEvent = () => {
            debouncedLogout();
        };

        const MouseMoveEvent = () => {
            debouncedLogout();
        };

        const throttledKeyDownEvent = throttle(KeyDownEvent, eventThrottleMs);
        const throttledMouseMoveEvent = throttle(MouseMoveEvent, eventThrottleMs);

        document.addEventListener(
            'keydown',
            throttledKeyDownEvent,
            { passive: true }
        );
        document.addEventListener('mousemove', throttledMouseMoveEvent
            , {passive: true});

        return () => {
            document.removeEventListener('keydown', throttledKeyDownEvent, {
                passive: true
            });
            document.removeEventListener('mousemove', throttledMouseMoveEvent, {
                passive: true
            });
            throttledKeyDownEvent.cancel();
            throttledMouseMoveEvent.cancel();
            debouncedLogout.cancel();
        };
    }, [logUserOut, timerMs]);

    return <React.Fragment />;
};
