import { AxiosResponse } from "axios";
import { NewProduct } from "../types/product";
import { AxiosService } from "./axios.service";

export class ProductService extends AxiosService {
  addProduct = async (formData: FormData): Promise<AxiosResponse<any>> => {
    return await this.instance.post("/products", formData);
  };
}
