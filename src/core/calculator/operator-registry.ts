import { StackOperation } from '../types/types';
import binaryOperations from './binary-operations';

const operators: Record<string, StackOperation> = {
  '+': binaryOperations.add,
  '-': binaryOperations.subtract,
  '*': binaryOperations.multiply,
  '/': binaryOperations.divide,
};

export const getOperator = (symbol: string): StackOperation | undefined => {
  return operators[symbol];
};
