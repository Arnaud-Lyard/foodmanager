export interface IRegisterResponse {
  status: Status;
  message?: string;
  errors: [
    {
      message: string;
    }
  ];
}

export interface IVerifyEmailResponse {
  status: Status;
  message?: string;
  errors: [
    {
      message: string;
    }
  ];
}

export interface ILoginResponse {
  status: Status;
  message?: string;
  errors: [
    {
      message: string;
    }
  ];
}

export interface IForgotPasswordResponse {
  status: Status;
  message?: string;
  errors: [
    {
      message: string;
    }
  ];
}

export interface IResetPasswordResponse {
  status: Status;
  message?: string;
  errors: [
    {
      message: string;
    }
  ];
}

export interface ILogoutResponse {
  status: Status;
}

export type Status = 'success' | 'fail';
