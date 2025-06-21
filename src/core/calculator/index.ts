import { Stack } from '../types/types';
import { getOperator } from './operator-registry';

export const evaluateExpression = (inputs: string[], stack: Stack) => {
  return inputs.reduce((stack, input) => {
    const num = parseFloat(input);

    if (!isNaN(num)) {
      return [...stack, num];
    }

    const operator = getOperator(input);
    if (operator) {
      return operator(stack);
    }

    throw new Error(`Invalid input: ${input}`);
  }, stack);
};
