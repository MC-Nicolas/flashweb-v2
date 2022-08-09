export interface smartCardState {
  modalIsOpened: boolean;
  elementOptions: { name: string; value: string }[];
  numberOptions: { name: string; value: string }[];
  typeOfNumber: string;
  typeOfElement: string;
  addVariableIsOpened: boolean;
}
