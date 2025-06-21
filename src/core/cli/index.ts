import { createInterface } from 'readline';
import { evaluateExpression } from '../calculator/index';
import { Stack } from '../types/types';

const handleCalculation = (inputs: string[], stack: Stack) => {
  let newStack = stack;
  try {
    newStack = evaluateExpression(inputs, stack);
    const topOfStack =
      newStack.length > 0
        ? newStack[newStack.length - 1]
        : 'Nothing to calculate!';

    console.log(topOfStack);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
  }

  return newStack;
};

export const startCli = () => {
  console.log('Reverse Polish Notation Calculator');
  console.log('Enter your expression or press q to quit.');

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  });

  let stack: Stack = [];

  rl.prompt();

  rl.on('line', (line) => {
    const input = line.trim();

    if (input.toLowerCase() === 'q') {
      rl.close();
      return;
    }

    if (input) {
      const inputs = input.split(/\s+/);
      stack = handleCalculation(inputs, stack);
    }

    rl.prompt();
  }).on('close', () => {
    console.log('Exiting calculator.');
  });
};

if (require.main === module) {
  startCli();
}
