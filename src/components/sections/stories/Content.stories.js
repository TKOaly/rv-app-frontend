import { storiesOf } from '@storybook/react';
import { stubProductAndCategoryApis } from '../../../stub';
import Content from '../Content';
import React from 'react';
import withReduxAndRouter from './../../../withReduxAndRouter';

storiesOf('Content', module)
    .addDecorator(withReduxAndRouter)
    .add('Initial', () => {
        stubProductAndCategoryApis();
        return <Content />;
    });
