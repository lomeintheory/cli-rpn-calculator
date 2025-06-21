import operations from '../../src/core/calculator/binary-operations';

describe('Binary Operations', () => {
  describe('add', () => {
    it('should add the top two numbers on the stack', () => {
      const stack = [2, 3];
      const newStack = operations.add(stack);
      expect(newStack).toEqual([5]);
    });
  });

  describe('subtract', () => {
    it('should subtract the top two numbers on the stack', () => {
      const stack = [2, 5];
      const newStack = operations.subtract(stack);
      expect(newStack).toEqual([-3]);
    });
  });

  describe('multiply', () => {
    it('should multiply the top two numbers on the stack', () => {
      const stack = [2, 4];
      const newStack = operations.multiply(stack);
      expect(newStack).toEqual([8]);
    });
  });

  describe('divide', () => {
    it('should divide the top two numbers on the stack', () => {
      const stack = [8, 2];
      const newStack = operations.divide(stack);
      expect(newStack).toEqual([4]);
    });

    it('should throw an error when dividing by zero', () => {
      const stack = [5, 0];
      expect(() => operations.divide(stack)).toThrow(
        'Error: Cannot divide by zero',
      );
    });
  });
});
