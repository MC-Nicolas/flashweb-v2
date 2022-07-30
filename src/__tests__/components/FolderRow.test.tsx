import FolderRow from '@/components/ImportantFolderTable/FolderRow';
import { render, screen } from '@testing-library/react';
let folder: any = {
  id: 'navigation',
  name: 'PPL - Navigation',
  numberOfFlashcards: 12,
  timeSpent: 47,
  avgSuccess: 87,
  doneToday: 100,
  pushTo: '/study/ppl/navigation',
};

test('Renders Folder Row with full row data', () => {
  render(<FolderRow folder={folder} />);

  expect(screen.getByText('PPL - Navigation')).toBeInTheDocument();
  expect(screen.getByText('12')).toBeInTheDocument();
  expect(screen.getByText('47')).toBeInTheDocument();
  expect(screen.getByText('87%')).toBeInTheDocument();
  expect(screen.getByText('100%')).toBeInTheDocument();
});

test('Renders Folder row without AVG Success and Done Today', () => {
  folder = {
    ...folder,
    avgSuccess: null,
    doneToday: null,
  };

  render(<FolderRow folder={folder} />);

  expect(screen.getByText('PPL - Navigation')).toBeInTheDocument();
  expect(screen.getByText('12')).toBeInTheDocument();
  expect(screen.getByText('47')).toBeInTheDocument();
  expect(screen.queryByText('87%')).not.toBeInTheDocument();
  expect(screen.queryByText('100%')).not.toBeInTheDocument();
});

test('Renders Folder with the right colors', () => {
  folder = {
    ...folder,
    avgSuccess: 87,
    doneToday: 100,
  };

  render(<FolderRow folder={folder} />);

  expect(screen.getByText('87%')).toHaveStyle('color: green');
  expect(screen.getByText('100%')).toHaveStyle('color: green');

  folder = {
    ...folder,
    avgSuccess: 65,
    doneToday: 75,
  };

  render(<FolderRow folder={folder} />);

  expect(screen.getByText('65%')).toHaveStyle('color: orange');
  expect(screen.getByText('75%')).toHaveStyle('color: orange');

  folder = {
    ...folder,
    avgSuccess: 10,
    doneToday: 25,
  };

  render(<FolderRow folder={folder} />);

  expect(screen.getByText('10%')).toHaveStyle('color: red');
  expect(screen.getByText('25%')).toHaveStyle('color: red');
});
