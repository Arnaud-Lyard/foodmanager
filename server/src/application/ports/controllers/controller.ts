import { RequestModel } from '../../ports/requests/request-model';
import { ResponseModel } from '../../ports/responses/response-model';

export interface Controller<T = unknown> {
  handleRequest(requestModel: RequestModel): Promise<ResponseModel<T>>;
}
