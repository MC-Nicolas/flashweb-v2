import { SmartCardState } from '@/types/smartCard';
import { createSlice } from '@reduxjs/toolkit';

export const initialState: SmartCardState = {
  editModalIsOpen: false,
  elementOptions: [
    { name: 'Number', value: 'number' },
    { name: 'Text', value: 'text' },
  ],

  numberOptions: [
    { name: 'Number', value: 'number' },
    { name: 'Random number', value: 'randomnumber' },
    { name: 'Text', value: 'text' },
  ],
  typeOfNumber: 'number',
  addVariableIsOpened: false,
  tableIsCollapsed: false,
  draggableVariablesIsOpened: false,
  resultFormIsOpened: false,
  previewIsOpened: false,
  typeOfElementToAdd: '',
  variableToAdd: { name: '', value: '', symbol: '', type: '' },
  variables: [],
  isEdit: false,
};

export const smartCardSlice = createSlice({
  name: 'smartCard',
  initialState,
  reducers: {
    setEditModalIsOpen: (state, action) => {
      state.editModalIsOpen = action.payload;
    },

    setTypeOfNumber: (state, action) => {
      state.typeOfNumber = action.payload;
    },
    setTypeOfElementToAdd: (state, action) => {
      state.typeOfElementToAdd = action.payload;
    },
    setOpenedModal: (state, action) => {
      state.tableIsCollapsed = false;
      state.previewIsOpened = false;
      state.draggableVariablesIsOpened = false;
      state.resultFormIsOpened = false;
      state.addVariableIsOpened = false;
      //@ts-ignore
      state[action.payload] = true;
    },
    setAllVariables: (state, action) => {
      state.variables = action.payload;
    },
    setVariableToAdd: (
      state: any,
      action: { payload: { key: string; value: string | number | {} } }
    ) => {
      state.variableToAdd[action.payload.key] = action.payload.value;
    },
    resetVariableToAdd: (state) => {
      state.variableToAdd = { name: '', value: '', symbol: '', type: '' };
    },
    setVariableToEdit: (state, action) => {
      state.variableToAdd = action.payload;
    },
    setVariableResult: (
      state,
      action: { payload: { key: string; value: string } }
    ) => {
      //@ts-ignore
      state.variableToAdd.value[action.payload.key] = action.payload.value;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    updateVariable: (
      state,
      action: { payload: { id: number | string; data: any } }
    ) => {
      const findIndex = state.variables.findIndex((item) => {
        if (item.id) {
          return item.id === action.payload.id;
        }
      });
      // @ts-ignore
      state.variables[findIndex] = action.payload.data;
      state.variableToAdd = {
        name: '',
        value: '',
        symbol: '',
        type: action.payload.data.type,
      };
    },
    addVariable: (state, action) => {
      state.variables.push({
        ...action.payload,
        id: (Math.random() * 100000).toString(),
      });

      state.variableToAdd.symbol = '';
      state.variableToAdd.name = '';
    },
    removeVariable: (state, action: { payload: string }) => {
      state.variables = state.variables.filter(
        (variable) => variable.id !== action.payload
      );
    },
    setMinMaxOnVariableToAdd: (
      state: any,
      action: { payload: { key: string; value: number } }
    ) => {
      state.variableToAdd.value[action.payload.key] = action.payload.value;
    },
    reset: (state) => {
      state.variables = [];
      state.variableToAdd = {
        name: '',
        value: '',
        symbol: '',
        type: '',
      };
    },
  },
});

export const {
  setEditModalIsOpen,
  setTypeOfNumber,
  setTypeOfElementToAdd,
  setAllVariables,
  setVariableResult,
  setVariableToAdd,
  addVariable,
  removeVariable,
  resetVariableToAdd,
  updateVariable,
  setOpenedModal,
  setMinMaxOnVariableToAdd,
  setVariableToEdit,
  setIsEdit,
  reset,
} = smartCardSlice.actions;
export default smartCardSlice.reducer;
