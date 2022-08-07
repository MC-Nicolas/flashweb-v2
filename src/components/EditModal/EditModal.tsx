import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import React, { useEffect, useState } from 'react';
import NeumorphicContainer from '../Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '../FlexContainer/FlexContainer';
import CloseIcon from '@mui/icons-material/Close';
import { setModalIsOpen } from '@/redux/editModal/editModalSlice';
import SectionTitle from '../Texts/SectionTitle';
import BasicInput from '../Inputs/BasicInput';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const EditModal = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const { isOpen, typeOfElementToEdit, nameOfElementToEdit } = useAppSelector(
    (state) => state.editModal
  );

  useEffect(() => {
    setTitle(nameOfElementToEdit);
  }, [nameOfElementToEdit]);

  return (
    <FlexContainer
      style={{
        position: 'fixed',
        textAlign: 'center',
        zIndex: 100000,
        backdropFilter: 'blur(10px)',
        color: 'white',
        display: isOpen ? 'flex' : 'none',
      }}
      width='100%'
      height='100%'
    >
      <NeumorphicContainer width='500px' height='500px'>
        <FlexContainer
          height='50px'
          justifyContent='flex-end'
          style={{ paddingRight: 30 }}
        >
          <CloseIcon
            onClick={() => dispatch(setModalIsOpen(false))}
            sx={{ cursor: 'pointer' }}
          />
        </FlexContainer>
        <SectionTitle title={nameOfElementToEdit} />
        <FlexContainer height='80%'>
          <BasicInput
            label='Title'
            placeholder='New Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ButtonWithIcon
            style={{ backgroundColor: 'green', width: '200px' }}
            title='Save'
            iconIsComponent
            iconPosition='right'
            icon={<ArrowRightAltIcon />}
            onClick={() => console.log('test')}
          />
        </FlexContainer>
      </NeumorphicContainer>
    </FlexContainer>
  );
};

export default EditModal;
