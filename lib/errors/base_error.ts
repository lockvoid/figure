export abstract class BaseError extends Error {
  public stack: any;

  constructor(public code: number, public message: any) {
    super(message);
    this.stack = (<any>new Error(message)).stack;
  }

  toString(): string {
    return `${this.code} - ${this.message}`;
  }
}
