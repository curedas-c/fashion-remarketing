export class ResetPasswordCredentials {
    userName: string;
    password: string;
    password_confirmation: string;

  constructor(options: {
    userName: string;
    password: string;
    password_confirmation: string;
  }) {
    this.userName = options.userName;
    this.password = options.password;
    this.password_confirmation = options.password_confirmation;
  }
}
