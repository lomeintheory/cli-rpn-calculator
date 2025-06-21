import { StackOperation, Stack } from '../types/types';

export const applyBinaryOperation = (
  operation: (a: number, b: number) => number,
): StackOperation => {
  return (stack: Stack) => {
    if (stack.length < 2) {
      throw new Error('Not enough operands for a binary operation');
    }
    const remainingNums = stack.slice(0, -2);
    const [a, b] = stack.slice(-2);

    return [...remainingNums, operation(a, b)];
  };
};
