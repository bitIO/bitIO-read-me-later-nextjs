import { render, screen } from '@testing-library/react';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('has correct section links', () => {
    render(<Welcome />);
    expect(screen.getByText('raindrop')).toHaveAttribute('href', 'https://raindrop.io/');
    expect(screen.getByText('pocket')).toHaveAttribute('href', 'https://getpocket.com/');
  });
});
