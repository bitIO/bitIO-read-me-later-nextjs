import { storiesOf } from '@storybook/react';
import { StoryWrapper } from '../StoryWrapper';
import attributes from './attributes.story.json';
import { Header } from './Header';

storiesOf('Header', module).add('Header', () => (
  <StoryWrapper attributes={attributes} component={Header} />
));
