import axios, { AxiosInstance } from "axios";
import { NewProduct } from "../types/product";

export class ProductService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      withCredentials: true,
    });
  }

  addProduct = async (data: NewProduct) => {
    return this.instance
      .post("/products", data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
}
