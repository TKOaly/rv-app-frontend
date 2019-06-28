import { configure, addParameters, addDecorator } from '@storybook/react';
import withReduxAndRouter from './../src/withReduxAndRouter';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';

addParameters({
    backgrounds: [{ name: 'dark', value: '#333', default: true }, { name: 'light', value: '#ffffff' }]
});

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(withReduxAndRouter);

function loadStories() {
    require('../src/stories');
}

configure(loadStories, module);
