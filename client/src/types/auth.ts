export interface RegisterResponse {
  status: Status;
  message?: string;
  errors: [
    {
      message: string;
    }
  ];
}

export interface VerifyEmailResponse {
  status: Status;
  message?: string;
  errors: [
    {
      message: string;
    }
  ];
}

type Status = "success" | "fail";
