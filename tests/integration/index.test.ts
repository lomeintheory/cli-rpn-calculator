import { createInterface } from 'readline';
import { evaluateExpression } from '../../src/core/calculator';
import { startCli } from '../../src/core/cli';

jest.mock('readline');
jest.mock('../../../src/core/calculator');

const mockedCreateInterface = createInterface as jest.Mock;
const mockedEvaluateExpression = evaluateExpression as jest.Mock;

describe('Command Line Interface', () => {
  let readlineEvents: Record<string, (...args: any[]) => void>;
  let close: jest.Mock;
  let prompt: jest.Mock;
  let logSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    readlineEvents = {};
    const on = jest.fn(
      (
        event: string,
        callback: (...args: any[]) => void,
      ): { on: jest.Mock } => {
        readlineEvents[event] = callback;
        return { on };
      },
    );
    close = jest.fn();
    prompt = jest.fn();

    mockedCreateInterface.mockReturnValue({ on, close, prompt });
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockedEvaluateExpression.mockClear();
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  it('should start the CLI and process inputs', () => {
    // Start the CLI
    startCli();

    // Check initial output
    expect(logSpy).toHaveBeenCalledWith('Reverse Polish Notation Calculator');
    expect(logSpy).toHaveBeenCalledWith(
      'Enter your expression or press q to quit.',
    );
    expect(prompt).toHaveBeenCalledTimes(1);

    // Simulate user entering '5'
    mockedEvaluateExpression.mockReturnValue([5]);
    readlineEvents.line('5');
    expect(mockedEvaluateExpression).toHaveBeenCalledWith(['5'], []);
    expect(logSpy).toHaveBeenCalledWith(5);
    expect(prompt).toHaveBeenCalledTimes(2);

    // Simulate user entering '8' and then '+'
    mockedEvaluateExpression.mockReturnValue([5, 8]);
    readlineEvents.line('8');
    expect(mockedEvaluateExpression).toHaveBeenCalledWith(['8'], [5]);

    mockedEvaluateExpression.mockReturnValue([13]);
    readlineEvents.line('+');
    expect(mockedEvaluateExpression).toHaveBeenCalledWith(['+'], [5, 8]);
    expect(logSpy).toHaveBeenCalledWith(13);
    expect(prompt).toHaveBeenCalledTimes(4);

    // Simulate user quitting
    readlineEvents.line('q');
    expect(close).toHaveBeenCalled();
  });

  it('should handle errors thrown by the calculator', () => {
    startCli();
    const errorMessage = 'Test error';
    mockedEvaluateExpression.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    readlineEvents.line('error-input');

    expect(errorSpy).toHaveBeenCalledWith(`Error: ${errorMessage}`);
  });

  it('should ignore empty lines', () => {
    startCli();
    readlineEvents.line('   ');
    expect(mockedEvaluateExpression).not.toHaveBeenCalled();
    expect(prompt).toHaveBeenCalledTimes(2);
  });
});
