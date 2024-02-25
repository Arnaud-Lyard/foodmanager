export interface IServerResponse {
  status: Status;
  message?: string;
  errors: [
    {
      message: string;
    }
  ];
}

export type Status = 'success' | 'fail';
