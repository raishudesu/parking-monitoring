export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class LoginError extends PublicError {
  constructor() {
    super("Invalid Gate Pass Number or Password");
    this.name = "LoginError";
  }
}
