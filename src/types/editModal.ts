export interface EditModalState {
  isOpen: boolean;
  typeOfElementToEdit: string;
  nameOfElementToEdit: string;
  typeOfFlashcard: string;
  classicFlashcard: { front: string; back: string };
  flashcardIsFlipped: boolean;
}
