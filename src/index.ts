import { parse } from "path";

export interface ErrorMessage {
  message: string;
  stack: Array<{
    line: number;
    column: number;
    filename: string;
  }>;
}

const CHROME_STACK_REGEXP = /^\s*at\s.*(\S+|<anonymous>)\:\d+\:\d+$/m;
const FIREFOX_STACK_REGEXP = /^\s*(\S+@\S+|<anonymous>|\S+)\:\d+\:\d+/;

function parseChromeError(err: Error): ErrorMessage {
  const filtered = err.stack.split("\n").filter(line => {
    return !!line.match(CHROME_STACK_REGEXP);
  });

  const errStack = filtered
    .map(row => {
      const trimmedRow = row.trim();
      const splited = trimmedRow.match(/^at\s(.+\s)?(.+):(\d+):(\d+)$/);

      const filename = splited[2];
      const line = parseInt(splited[3], 10);
      const column = parseInt(splited[4], 10);
      return {
        line,
        column,
        filename,
      };
    })
    .filter(obj => {
      return obj.filename !== "<anonymous>";
    });

  return {
    message: err.message,
    stack: errStack,
  };
}

function parseFirefoxError(err: Error): ErrorMessage {
  const filtered = err.stack.split("\n").filter(line => {
    return !!line.match(FIREFOX_STACK_REGEXP);
  });

  const errStack = filtered
    .map(row => {
      const trimmedRow = row.trim();
      const splited = trimmedRow.match(/(.+@)?(.+):(\d+):(\d+)/);

      const filename = splited[2];
      const line = parseInt(splited[3], 10);
      const column = parseInt(splited[4], 10);
      return {
        line,
        column,
        filename,
      };
    })
    .filter(obj => {
      return obj.filename !== "<anonymous>";
    });
  return {
    message: err.message,
    stack: errStack,
  };
}

export function parseError(err: Error): ErrorMessage {
  if (err.stack && err.stack.match(CHROME_STACK_REGEXP)) {
    return parseChromeError(err);
  } else if (err.stack && err.stack.match(FIREFOX_STACK_REGEXP)) {
    return parseFirefoxError(err);
  } else {
    throw new Error("Cannot parse given Error object");
  }
}
