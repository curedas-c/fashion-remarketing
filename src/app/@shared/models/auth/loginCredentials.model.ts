export class LoginCredentials {
    username: string;
    password: string;

  constructor(options: {
    username: string;
    password: string;
  }) {
    this.username = options.username;
    this.password = options.password;
  }
}
