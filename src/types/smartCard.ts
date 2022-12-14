export interface variableToAddType {
  name: string;
  value:
    | string
    | number
    | { min: number; max: number }
    | {
        firstOp: string;
        secondOp: string;
        operator: string;
        rounded?: boolean;
        roundNumber?: number;
      };
  symbol: string;
  type: string;
}
export interface variablesWithIdType extends variableToAddType {
  id: string;
  isVisible: boolean;
}

export interface SmartCardState {
  editModalIsOpen: boolean;
  elementOptions: { name: string; value: string }[];
  numberOptions: { name: string; value: string }[];
  typeOfNumber: string;
  addVariableIsOpened: boolean;
  tableIsCollapsed: boolean;
  draggableVariablesIsOpened: boolean;
  resultFormIsOpened: boolean;
  previewIsOpened: boolean;
  typeOfElementToAdd: string;
  typeOfVariable: string;
  variableToAdd: variableToAddType | variablesWithIdType;
  variables: variablesWithIdType[];
  isEdit: boolean;
}
