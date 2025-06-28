import binaryOperations from '../../src/core/calculator/binary-operations';
import { getOperator } from '../../src/core/calculator/operator-registry';

jest.mock('../../src/core/calculator/binary-operations', () => ({
  add: jest.fn(),
  subtract: jest.fn(),
  multiply: jest.fn(),
  divide: jest.fn(),
}));

describe('getOperator', () => {
  it('should return the correct function for a registered operator', () => {
    expect(getOperator('+')).toBe(binaryOperations.add);
    expect(getOperator('-')).toBe(binaryOperations.subtract);
    expect(getOperator('*')).toBe(binaryOperations.multiply);
    expect(getOperator('/')).toBe(binaryOperations.divide);
  });

  it('should return undefined for an unregistered operator', () => {
    expect(getOperator('^')).toBeUndefined();
  });
});
