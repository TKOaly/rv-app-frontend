import { configure, addParameters, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import '../src/reset.scss';

addParameters({
    backgrounds: [{ name: 'dark', value: '#333', default: true }, { name: 'light', value: '#ffffff' }]
});

addDecorator(withA11y);
addDecorator(withKnobs);

const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
