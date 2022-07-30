import { render, screen } from '@testing-library/react';
import { renderWithProviders } from '@/redux/test-utils';
import Home from '@/pages/index';

describe('Home', () => {
  it('renders home page', () => {
    renderWithProviders(<Home />);

    const title = screen.getByText('Welcome to GLA !');
    const description = screen.getByText(
      'The one platform to learn everything you need.'
    );

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
