export interface Login {
  readonly email: string;
  readonly password: string;
}


export interface resetPassword {
  readonly password: string;
  readonly confirmPassword: string;
}
