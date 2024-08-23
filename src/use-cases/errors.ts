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

export class AdminLoginError extends PublicError {
  constructor() {
    super("Invalid Email or Password");
    this.name = "AdminLoginError";
  }
}
