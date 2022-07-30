import { render, screen } from '@testing-library/react';
import ImportantFolderTable from '@/components/ImportantFolderTable/ImportantFolderTable';

test('Renders ImportFolderTable correctly', () => {
  render(<ImportantFolderTable />);

  expect(screen.getByText('PPL - Navigation')).toBeInTheDocument();
  expect(screen.getByText('12')).toBeInTheDocument();
  expect(screen.getByText('47')).toBeInTheDocument();
  expect(screen.getByText('87%')).toBeInTheDocument();
  expect(screen.getByText('100%')).toBeInTheDocument();

  expect(screen.getByText('My Errors')).toBeInTheDocument();
  expect(screen.getByText('10')).toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();

  expect(screen.getByText('PPL - Meteorology')).toBeInTheDocument();
  expect(screen.getByText('8')).toBeInTheDocument();
  expect(screen.getByText('15')).toBeInTheDocument();
  expect(screen.getByText('65%')).toBeInTheDocument();
  expect(screen.getByText('75%')).toBeInTheDocument();
});
