export class ResetPasswordCredentials {
    username: string;
    password: string;
    password_confirmation: string;

  constructor(options: {
    username: string;
    password: string;
    password_confirmation: string;
  }) {
    this.username = options.username;
    this.password = options.password;
    this.password_confirmation = options.password_confirmation;
  }
}
