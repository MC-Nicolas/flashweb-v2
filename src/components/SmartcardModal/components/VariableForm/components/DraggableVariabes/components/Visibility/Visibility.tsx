import FlexContainer from '@/components/FlexContainer/FlexContainer';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { variablesWithIdType } from '@/types/smartCard';
import { deepCopy } from '@firebase/util';
import { setAllVariables } from '@/redux/smartCard/smartCardSlice';

type VisibilityProps = {
  variable: variablesWithIdType;
};

const Visibility = ({ variable }: VisibilityProps) => {
  const dispatch = useAppDispatch();
  const { isVisible, id } = variable;

  const { variables } = useAppSelector((state) => state.smartcard);

  const handleChangeVariableVisibility = () => {
    const newVariables = deepCopy(variables);
    const indexOfVariable = newVariables.findIndex(
      (v: variablesWithIdType) => v.id === id
    );
    newVariables[indexOfVariable].isVisible = !isVisible;
    dispatch(setAllVariables(newVariables));
  };

  return (
    <FlexContainer
      height='10px'
      width='20px'
      style={{
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        right: 0,
      }}
    >
      {isVisible ? (
        <VisibilityIcon
          sx={{ color: 'white', fontSize: 16 }}
          onClick={handleChangeVariableVisibility}
        />
      ) : (
        <VisibilityOffIcon
          sx={{ color: 'white', fontSize: 16 }}
          onClick={handleChangeVariableVisibility}
        />
      )}
    </FlexContainer>
  );
};

export default Visibility;
