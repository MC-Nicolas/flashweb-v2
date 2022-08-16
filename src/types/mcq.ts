export interface MCQAnswerType {
  text: string;
  isCorrect: boolean;
}

export interface MCQState {
  front: string;
  back: MCQAnswerType[];
}
