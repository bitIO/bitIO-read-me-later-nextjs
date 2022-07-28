import { storiesOf } from '@storybook/react';

import attributes from './attributes.story.json';
import { Header } from './Header';

import { StoryWrapper } from '../StoryWrapper';

storiesOf('Header', module).add('Header', () => (
  <StoryWrapper attributes={attributes} component={Header} />
));
