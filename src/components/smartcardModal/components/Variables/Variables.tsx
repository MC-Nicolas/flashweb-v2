import React, { useState } from 'react';

import FlexContainer from '@/components/FlexContainer/FlexContainer';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Select from '@/components/Inputs/Select';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import {
  setAddVariableIsOpened,
  setTypeOfElement,
  setTypeOfNumber,
} from '@/redux/smartCard/smartCardSlice';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import ButtonWithIcon from '@/components/Buttons/ButtonWithIcon';
import Image from 'next/image';
import ArrowRight from '@/assets/icons/arrowRight.png';
import SubmitForm from '@/components/Buttons/SubmitForm';
import { Button } from '@mui/material';
import ButtonWithDropdown from '@/components/ButtonWithDropdown/ButtonWithDropdown';
import BasicTable from '@/components/BasicTable/BasicTable';
import ExtensibleContainer from '@/components/ExtensibleContainer/ExtensibleContainer';
import { KeyboardArrowDown } from '@mui/icons-material';

type Props = {};

const Variables = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    elementOptions,
    typeOfElement,
    typeOfNumber,
    numberOptions,
    addVariableIsOpened,
  } = useAppSelector((state) => state.smartcard);
  const [tableIsCollapsed, setTableIsCollapsed] = useState(false);
  return (
    <FlexContainer height='90%' alignItems='flex-start'>
      <FlexContainer
        height='10%'
        width='100%'
        style={{ color: 'white' }}
        alignItems='center'
        justifyContent='flex-end'
      >
        <FlexContainer
          width='60px'
          height='40px'
          style={{
            borderRadius: '3px',
            backgroundColor: 'white',
            marginRight: '10px',
          }}
        >
          <KeyboardArrowDown
            sx={{
              color: 'black',
              cursor: 'pointer',
              transform: tableIsCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-in-out',
            }}
            onClick={() => setTableIsCollapsed(!tableIsCollapsed)}
          />
        </FlexContainer>
        <ButtonWithDropdown onChange={(v: string) => console.log(v)} />
      </FlexContainer>
      {!tableIsCollapsed && (
        <FlexContainer height='200px'>
          <BasicTable />
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

const StyledTextField = styled(TextField)({
  // color label
  '& label': {
    color: 'white',
    paddingLeft: '15px',
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInputBase-input': {
    color: 'white',
    bakcgroundColor: 'transparent',
    borderBottom: '1px solid #ced4da',
    paddingLeft: '15px',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
});
export default Variables;
