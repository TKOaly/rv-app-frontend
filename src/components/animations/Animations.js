import './animations.scss';
import { CSSTransition } from 'react-transition-group';
import React from 'react';

export const SlideIn = ({ children, ...props }) => (
    <CSSTransition {...props} timeout={1000} classNames="slide" unmountOnExit={true} mountOnEnter={true}>
        {children}
    </CSSTransition>
);

export const Fade = ({ children, ...props }) => (
    <CSSTransition {...props} timeout={1000} classNames="fade" unmountOnExit={true} mountOnEnter={true}>
        {children}
    </CSSTransition>
);
