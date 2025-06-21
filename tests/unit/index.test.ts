import { evaluateExpression } from '../../src/core/calculator/index';
import { getOperator } from '../../src/core/calculator/operator-registry';

jest.mock('../../../src/core/calculator/operator-registry');

const mockedGetOperator = getOperator as jest.Mock;

describe('evaluateExpression', () => {
  beforeEach(() => {
    mockedGetOperator.mockClear();
  });

  it('should push numbers onto the stack', () => {
    const stack = [1];
    const inputs = ['2', '3.5'];
    const newStack = evaluateExpression(inputs, stack);
    expect(newStack).toEqual([1, 2, 3.5]);
  });

  it('should apply an operator to the stack', () => {
    const mockAdd = jest.fn((s) => [s[0] + s[1]]);
    mockedGetOperator.mockReturnValue(mockAdd);

    const stack = [3, 4];
    const inputs = ['+'];
    const newStack = evaluateExpression(inputs, stack);

    expect(mockedGetOperator).toHaveBeenCalledWith('+');
    expect(mockAdd).toHaveBeenCalledWith([3, 4]);
    expect(newStack).toEqual([7]);
  });

  it('should evaluate an expression with multiple operators', () => {
    const mockAdd = jest.fn().mockImplementation((s) => {
      const [a, b] = s.slice(-2);
      return [...s.slice(0, -2), a + b];
    });
    const mockSubtract = jest.fn().mockImplementation((s) => {
      const [a, b] = s.slice(-2);
      return [...s.slice(0, -2), a - b];
    });

    mockedGetOperator.mockImplementation((op) => {
      if (op === '+') return mockAdd;
      if (op === '-') return mockSubtract;
      return undefined;
    });

    const stack: number[] = [];
    const inputs = ['5', '8', '+', '3', '-'];
    const newStack = evaluateExpression(inputs, stack);

    expect(newStack).toEqual([10]);
  });

  it('should throw an error for an invalid input', () => {
    mockedGetOperator.mockReturnValue(undefined);
    const stack: number[] = [1, 2];
    const inputs = ['snap!'];
    expect(() => evaluateExpression(inputs, stack)).toThrow(
      'Invalid input: snap!',
    );
  });
});
