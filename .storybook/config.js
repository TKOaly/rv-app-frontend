import { configure, addParameters, addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";

addParameters({
  backgrounds: [
    { name: "dark", value: "#333", default: true },
    { name: "light", value: "#ffffff" }
  ]
});

addDecorator(withA11y);
addDecorator(withKnobs);

function loadStories() {
  require("../src/stories");
}

configure(loadStories, module);
