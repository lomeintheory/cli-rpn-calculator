import { applyBinaryOperation } from '../../src/core/calculator/apply-operation';
import { Stack } from '../../src/core/types/types';

describe('applyBinaryOperation', () => {
  it('should apply a binary operation to the top two numbers on the stack', () => {
    const mockOperation = (a: number, b: number) => a * b;
    const stackOperation = applyBinaryOperation(mockOperation);
    const stack = [2, 3, 4];
    const newStack = stackOperation(stack);
    expect(newStack).toEqual([2, 12]);
  });

  it.each([
    { stack: [] as Stack, name: 'an empty stack' },
    { stack: [5] as Stack, name: 'a stack with one operand' },
  ])('should throw an error for $name', ({ stack }) => {
    const mockOperation = (a: number, b: number) => a + b;
    const stackOperation = applyBinaryOperation(mockOperation);
    expect(() => stackOperation(stack)).toThrow(
      'Not enough operands for a binary operation',
    );
  });
});
