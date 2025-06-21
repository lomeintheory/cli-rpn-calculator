# CLI RPN Calculator

This is a command-line application that implements a Reverse Polish Notation (RPN) calculator using TypeScript and Node.js.

## Overview

Reverse Polish Notation is a mathematical notation in which every operator follows all of its operands. This application provides a CLI to perform these calculations. It manages a persistent stack of numbers, allowing users to input numbers and operators sequentially to evaluate complex expressions.

## Features

- **Interactive CLI:** A command-line prompt (`> `) for entering numbers and operators.
- **Stateful Stack:** The calculator maintains the stack between inputs, allowing for sequential operations.
- **Basic Arithmetic:** Supports addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`).

## Technical Design and Architecture

The design of this application prioritizes modularity and testability.

### Core Philosophy: Separation of Concerns

The architecture is cleanly divided into two main components:

1.  **Core Calculator (`src/core/calculator`):** This directory contains the "engine" of the calculator. It is composed of pure, stateless functions responsible for parsing inputs, managing operators, and applying them to a given stack. It has no knowledge of the user interface, making the core logic highly predictable and easy to unit test in isolation.
2.  **Command-Line Interface (`src/core/cli`):** This is the user-facing layer. It is responsible for handling user input via `readline`, managing the calculator's state (the stack), passing inputs to the core calculator, and displaying the results or errors to the console.

### Functional Core

The calculator logic was intentionally designed using a functional approach. Higher-order functions like `applyBinaryOperation` are used to create operator functions from simple lambda expressions. This reduces boilerplate and keeps the mathematical logic separate from the stack manipulation logic, further enhancing testability and clarity.

### TypeScript

TypeScript was chosen to provide static type safety. This is invaluable for preventing common runtime errors, improving developer tooling with autocompletion, and making the code more self-documenting and maintainable, especially as a project scales.

### Testing Strategy

The project has near-comprehensive test coverage using Jest.

- **Unit Tests:** The core calculator logic is validated with isolated unit tests. Dependencies are mocked to ensure that each function can be tested on its own merits.
- **Integration Tests:** The CLI is tested with a higher-level integration test that mocks the `readline` and `console` modules. This allows for the simulation of a full user session to verify that the application flow, from input to output, works as expected.

## Trade-offs and Future Work

In the interest of delivering a focused solution, several decisions were made and opportunities for future work were identified.

- **State Management:** The application's state (the stack) is currently managed within the `startCli` function loop. This is simple and effective for the current scope. For a more complex application, this state could be refactored into a more formally managed module such as a factory function.

- **Web-based User Interface:** The current architecture, with its strict separation between the core calculator logic and the UI, makes it straightforward to add a new user interface. While this was left out to focus on the CLI, a web front-end could be built to consume the same `src/core/calculator` functions, providing a graphical alternate UI.

- **Potential Future Features:**
  - Unary operators (e.g., `sqrt`, `pow`).
  - Support for user-defined variables.
  - An "clear" command to clear out the stack.
  - A command to view the entire current stack.

## Getting Started

Follow these instructions to run the application locally.

### Prerequisites

- Node.js (v20 or later)
- npm

### Installation & Usage

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd cli-rpn-calculator
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Run the application:**
    ```sh
    npm start
    ```

Enter numbers or operators one at a time and press Enter. To quit, type `q` and press Enter.

### Running Tests

To run the full suite of unit and integration tests, execute the following command:

```sh
npm test
```
