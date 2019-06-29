import { storiesOf } from '@storybook/react';
import { stubProductAndCategoryApis } from '../../../stub';
import ProductBrowser from '../ProductBrowser';
import React from 'react';
import sinon from 'sinon';

storiesOf('ProductBrowser', module).add('Initial', () => {
    stubProductAndCategoryApis();
    const setFilterRef = sinon.fake();
    const setTerminalRef = sinon.fake();

    return <ProductBrowser setFilterRef={setFilterRef} setTerminalRef={setTerminalRef} />;
});
