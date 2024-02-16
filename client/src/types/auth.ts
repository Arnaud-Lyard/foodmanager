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

type Status = 'success' | 'fail';
