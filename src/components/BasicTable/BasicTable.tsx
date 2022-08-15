import React, { useState, useEffect } from 'react';
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
import { variablesWithIdType } from '@/types/smartCard';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  removeVariable,
  setIsEdit,
  setEditModalIsOpen,
  setVariableToEdit,
  setOpenedModal,
  setVariableToAdd,
  setTypeOfElementToAdd,
  setTypeOfVariable,
} from '@/redux/smartCard/smartCardSlice';
import { getVariableById } from '@/utils/getData';
import { modals } from '@/redux/smartCard/modals';
import { tableRow } from '@/types/table';

const normalizedData = (variables: variablesWithIdType[]): tableRow[] => {
  return variables.map((variable) => {
    if (typeof variable.value === 'object') {
      //@ts-ignore
      if (variable.value['operator']) {
        return {
          ...variable,
          value: `${
            //@ts-ignore
            getVariableById(variables, variable.value['firstOp']).name
          } ${
            //@ts-ignore
            variable.value['operator']
            //@ts-ignore
          } ${getVariableById(variables, variable.value['secondOp']).name}`,
        };
      } else {
        return {
          ...variable,
          //@ts-ignore
          value: `${variable.value.min} - ${variable.value.max}`,
        };
      }
    } else {
      return {
        ...variable,
      };
    }
  });
};

const BasicTable = () => {
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector((state) => state.smartcard);
  const [normalizedRow, setNormalizedRow] = useState<tableRow[] | []>([]);

  useEffect(() => {
    setNormalizedRow(normalizedData(variables));
  }, [variables]);

  const handleEditVariable = (row: variablesWithIdType) => {
    dispatch(setVariableToEdit(row));
    dispatch(setIsEdit(true));
    dispatch(
      setTypeOfElementToAdd(row.type === 'result' ? 'result' : 'variable')
    );
    if (row.type !== 'result') {
      dispatch(setTypeOfVariable(row.type));
    }
    dispatch(setOpenedModal(modals.ADD_VARIABLE));
  };

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
          {normalizedRow.map((row: any) => (
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
                {row.type}
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align='right'>
                {row.value}
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align='right'>
                <EditIcon
                  style={{ cursor: 'pointer', color: 'green' }}
                  onClick={() => handleEditVariable(row)}
                />
              </StyledTableCell>
              <StyledTableCell style={{ color: 'white' }} align='right'>
                <DeleteIcon
                  style={{ cursor: 'pointer', color: 'red' }}
                  onClick={() => dispatch(removeVariable(row.id))}
                />
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
