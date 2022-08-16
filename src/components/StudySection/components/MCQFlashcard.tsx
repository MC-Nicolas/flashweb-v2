import NeumorphicContainer from '@/components/Containers/NeumorphicContainer/NeumorphicContainer';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import { useAppDispatch } from '@/redux/redux.hooks';
import { setAnswerIsSuccess } from '@/redux/study/StudySlice';
import { MCQAnswerType } from '@/types/mcq';
import { deepCopy } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import MCQAnswer from './MCQAnswer';

type MCQFlashcardProps = {
  front: string;
  back: MCQAnswerType[];
  isFlipped: boolean;
};

const MCQFlashcard = ({ front, back, isFlipped }: MCQFlashcardProps) => {
  const dispatch = useAppDispatch();
  const [userAnswers, setUserAnswers] = useState<any>([]);

  useEffect(() => {
    let formattedAnswers = deepCopy(back);
    formattedAnswers.forEach((answer: any) => {
      answer.isCorrect = false;
      answer.isBase = true;
    });
    setUserAnswers(formattedAnswers);
  }, [back]);

  useEffect(() => {
    let userAnswerWithIsBase = deepCopy(userAnswers);
    userAnswerWithIsBase.forEach((answer: any) => {
      delete answer.isBase;
    });

    dispatch(
      setAnswerIsSuccess(
        JSON.stringify(userAnswerWithIsBase) === JSON.stringify(back)
      )
    );
  }, [isFlipped]);

  useEffect(() => {
    if (isFlipped) {
      setUserAnswers(back);
    } else {
      let formattedAnswers = deepCopy(back);
      formattedAnswers.forEach((answer: any) => {
        answer.isCorrect = false;
        answer.isBase = true;
      });
      setUserAnswers(formattedAnswers);
    }
  }, [isFlipped]);

  return (
    <FlexContainer height='100%' width='80%'>
      <NeumorphicContainer
        height='50%'
        style={{
          color: 'white',
          fontSize: 22,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <p>{front}</p>
      </NeumorphicContainer>

      <FlexContainer height='40%'>
        {userAnswers.map((answer: any, index: number) => {
          return (
            <MCQAnswer
              key={answer.text}
              text={answer.text}
              isCorrect={answer.isCorrect}
              isBase={answer.isBase}
              setIsCorrect={(e: any, checked: boolean) => {
                let newAnswers = deepCopy(userAnswers);
                newAnswers[index] = {
                  ...newAnswers[index],
                  isCorrect: checked,
                };
                setUserAnswers(newAnswers);
              }}
            />
          );
        })}
      </FlexContainer>
    </FlexContainer>
  );
};

export default MCQFlashcard;
