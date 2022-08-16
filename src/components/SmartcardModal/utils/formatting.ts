import { variablesWithIdType } from '@/types/smartCard';
import { createRandomNumberWithMinMax } from '@/utils/data';
import { calculateResultByRecursion, getVariableOfType } from '@/utils/getData';
import { deepCopy } from '@firebase/util';

export const formatVariablesForOptions = (
  variables: variablesWithIdType[]
): { value: string; name: string }[] => {
  const filteredVariables = variables.filter(
    (variable: any) => variable.type !== 'text'
  );
  return filteredVariables.map(({ id, name }) => ({ value: id, name }));
};

export const handleVariablesCalculationsAndValues = (
  variables: variablesWithIdType[]
) => {
  let newVariables = deepCopy(variables);
  const randomNumberValues: variablesWithIdType[] = [];
  let result: any = undefined;
  newVariables?.forEach((variable: any) => {
    if (typeof variable.value === 'object' && variable.value['min']) {
      const min = variable.value['min'];
      const max = variable.value['max'];
      variable.value = createRandomNumberWithMinMax(min, max);
      randomNumberValues.push(variable);
      return variable;
    } else return variable;
  });
  const variableOfTypeResults = getVariableOfType(newVariables, 'result');
  if (variableOfTypeResults.length > 0) {
    const finalResultVariable =
      variableOfTypeResults[variableOfTypeResults.length - 1];

    result = calculateResultByRecursion(finalResultVariable, newVariables);
  }
  const variablesOptions = formatVariablesForOptions(newVariables);
  return { result, variablesOptions, newVariables, randomNumberValues };
};
