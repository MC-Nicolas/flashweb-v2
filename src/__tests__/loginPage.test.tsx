import { render, screen } from '@testing-library/react';
import LoginPage from '@/pages/login';

describe('Home', () => {
  it('renders home page', () => {
    render(<LoginPage />);

    const loginTitle = screen.getByText('Login page');

    expect(loginTitle).toBeInTheDocument();
  });
});
