import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addParameters, configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
configure(require.context('../src/stories', true, /\.stories\.js$/), module);

const newViewports = {
  iphone6: {
    name: 'iPhone 6',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
};

addParameters({
  viewport: {
    viewports: { ...INITIAL_VIEWPORTS, ...newViewports },
    defaultViewport: 'iphone6',
  },
});
