import { ProductService } from "../../services/product.service";
import { NewProduct } from "../../types/product";

export const useAddProduct = () => {
  const addProduct = async (formData: FormData) => {
    const productService = new ProductService();

    await productService.addProduct(formData);
  };
  return { addProduct };
};
