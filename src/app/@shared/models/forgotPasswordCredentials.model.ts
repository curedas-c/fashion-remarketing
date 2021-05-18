export class ForgotPasswordCredentials {
    email: string;

  constructor(options: {
    email: string;
  }) {
    this.email = options.email;
  }
}
