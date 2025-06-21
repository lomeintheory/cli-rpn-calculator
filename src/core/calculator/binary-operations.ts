import { applyBinaryOperation } from './apply-operation';

const add = applyBinaryOperation((a, b) => a + b);
const subtract = applyBinaryOperation((a, b) => a - b);
const multiply = applyBinaryOperation((a, b) => a * b);
const divide = applyBinaryOperation((a, b) => {
  if (b === 0) {
    throw new Error('Error: Cannot divide by zero');
  }
  return a / b;
});

export default {
  add,
  subtract,
  multiply,
  divide,
};
