import { variablesWithIdType } from '@/types/smartCard';

export const formatVariablesForOptions = (
  variables: variablesWithIdType[]
): { value: string; name: string }[] => {
  return variables.map(({ id, name }) => ({ value: id, name }));
};
