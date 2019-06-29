import { storiesOf } from '@storybook/react';
import { stubProductAndCategoryApis } from '../../../stub';
import ProductBrowser from '../ProductBrowser';
import React from 'react';
import sinon from 'sinon';
import withReduxAndRouter from './../../../withReduxAndRouter';

storiesOf('ProductBrowser', module)
    .addDecorator(withReduxAndRouter)
    .add('Initial', () => {
        stubProductAndCategoryApis();
        const setFilterRef = sinon.fake();
        const setTerminalRef = sinon.fake();

        return <ProductBrowser setFilterRef={setFilterRef} setTerminalRef={setTerminalRef} />;
    });
