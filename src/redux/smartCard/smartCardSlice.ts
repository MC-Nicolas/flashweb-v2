import { SmartCardState } from '@/types/smartCard';
import { createSlice } from '@reduxjs/toolkit';

export const initialState: SmartCardState = {
  modalIsOpened: false,
  elementOptions: [
    { name: 'Number', value: 'number' },
    { name: 'Text', value: 'text' },
  ],
  typeOfElement: 'number',
  numberOptions: [
    { name: 'Number', value: 'number' },
    { name: 'Random number', value: 'randomnumber' },
    { name: 'Text', value: 'text' },
    { name: 'Result', value: 'result' },
  ],
  typeOfNumber: 'number',
  addVariableIsOpened: false,
  tableIsCollapsed: false,
  draggableVariablesIsOpened: false,
  typeOfElementToAdd: '',
  variableToAdd: { name: '', value: '', symbol: '', type: '' },
  variables: [],
  isEdit: false,
};

export const smartCardSlice = createSlice({
  name: 'smartCard',
  initialState,
  reducers: {
    setModalIsOpened: (state, action) => {
      state.modalIsOpened = action.payload;
    },
    setTypeOfElement: (state, action) => {
      state.typeOfElement = action.payload;
    },
    setTypeOfNumber: (state, action) => {
      state.typeOfNumber = action.payload;
    },
    setAddVariableIsOpened: (state, action) => {
      state.addVariableIsOpened = action.payload;
    },
    setTableIsCollapsed: (state, action) => {
      state.tableIsCollapsed = action.payload;
    },
    setDraggableVariablesIsOpened: (state, action) => {
      state.draggableVariablesIsOpened = action.payload;
    },
    setTypeOfElementToAdd: (state, action) => {
      state.typeOfElementToAdd = action.payload;
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
      state.variableToAdd = {
        name: '',
        value: '',
        symbol: '',
        type: action.payload.type,
      };
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
  setModalIsOpened,
  setTypeOfElement,
  setTypeOfNumber,
  setAddVariableIsOpened,
  setTableIsCollapsed,
  setDraggableVariablesIsOpened,
  setTypeOfElementToAdd,
  setAllVariables,
  setVariableResult,
  setVariableToAdd,
  addVariable,
  removeVariable,
  updateVariable,
  setMinMaxOnVariableToAdd,
  setVariableToEdit,
  setIsEdit,
  reset,
} = smartCardSlice.actions;
export default smartCardSlice.reducer;
