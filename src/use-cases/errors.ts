export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class LoginError extends PublicError {
  constructor() {
    super("Invalid Email or Password");
    this.name = "LoginError";
  }
}

export class AdminLoginError extends PublicError {
  constructor() {
    super("Invalid Email or Password");
    this.name = "AdminLoginError";
  }
}

export class InvalidEmailError extends PublicError {
  constructor() {
    super("Invalid email. User does not exist.");
    this.name = "InvalidEmailError";
  }
}
