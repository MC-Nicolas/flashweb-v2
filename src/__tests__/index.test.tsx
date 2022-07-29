import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home', () => {
  it('renders home page', () => {
    render(<Home />);

    const title = screen.getByText('Welcome to GLA !');
    const description = screen.getByText(
      'The one platform to learn everything you need.'
    );

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
