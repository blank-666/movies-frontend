export interface ISignUpPayload {
  firstName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  lastName?: string;
}
