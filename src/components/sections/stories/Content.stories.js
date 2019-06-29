import { storiesOf } from '@storybook/react';
import { stubProductAndCategoryApis } from '../../../stub';
import Content from '../Content';
import React from 'react';

storiesOf('Content', module).add('Initial', () => {
    stubProductAndCategoryApis();
    return <Content />;
});
