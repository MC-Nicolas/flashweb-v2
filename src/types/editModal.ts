export interface EditModalState {
  isOpen: boolean;
  typeOfElementToEdit: string;
  nameOfElementToEdit: string;
  typeOfFlashcard: string;
  flashcardToEdit: { front: any; back: any };
  flashcardIsFlipped: boolean;
}
