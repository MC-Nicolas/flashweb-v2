import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const BasicTable = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        height: '100%',

        backgroundColor: 'transparent',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ color: 'white' }}>Name</StyledTableCell>
            <StyledTableCell style={{ color: 'white' }} align='right'>
              Type
            </StyledTableCell>
            <StyledTableCell style={{ color: 'white' }} align='right'>
              Value
            </StyledTableCell>
            <StyledTableCell
              style={{ color: 'white' }}
              align='right'
            ></StyledTableCell>
            <StyledTableCell
              style={{ color: 'white' }}
              align='right'
            ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell
                style={{ color: 'white' }}
                component='th'
                scope='row'
              >
                {row.name}
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align='right'>
                {row.calories}
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align='right'>
                {row.fat}
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align='right'>
                <EditIcon style={{ cursor: 'pointer', color: 'green' }} />
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align='right'>
                <DeleteIcon style={{ cursor: 'pointer', color: 'red' }} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#111',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#383838',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default BasicTable;
