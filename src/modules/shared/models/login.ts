export interface Login {
  username: string;
  password: string;
}

export interface ResetPasswordModel {
  email?: string,
  token?: string | undefined,
  password?: string
}

export interface ChangePasswordModel {
  oldPassword: string,
  password: string
}