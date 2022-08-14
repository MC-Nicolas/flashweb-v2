export interface variableToAddType {
  name: string;
  value:
    | string
    | number
    | { min: number; max: number }
    | { firstOp: string; secondOp: string; operator: string };
  symbol: string;
  type: string;
}
export interface variablesWithIdType extends variableToAddType {
  id: string;
}

export interface SmartCardState {
  modalIsOpened: boolean;
  elementOptions: { name: string; value: string }[];
  numberOptions: { name: string; value: string }[];
  typeOfNumber: string;
  typeOfElement: string;
  addVariableIsOpened: boolean;
  tableIsCollapsed: boolean;
  draggableVariablesIsOpened: boolean;
  resultFormIsOpened: boolean;
  previewIsOpened: boolean;
  typeOfElementToAdd: string;
  variableToAdd: variableToAddType;
  variables: variablesWithIdType[];
  isEdit: boolean;
}
