

export interface Logger {
  setFormat(fmt: string): void;

  trace(message: string) : void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}