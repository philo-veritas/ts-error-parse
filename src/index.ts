export interface ErrorMessage {
  message: string;
  stack: Array<{
    line: number;
    column: number;
    filename: string;
  }>;
}

export function parseError(err: Error): ErrorMessage {
  // implement
  return {
    message: "test_msg",
    stack: [
      {
        line: 1,
        column: 2,
        filename: "test_filename",
      },
    ],
  };
}
