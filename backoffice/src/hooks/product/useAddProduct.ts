import { ProductService } from "../../services/product.service";
import { NewProduct } from "../../types/product";

export const useAddProduct = () => {
  const addProduct = async (data: NewProduct) => {
    const productService = new ProductService(
      process.env.NEXT_PUBLIC_SERVER_URL!
    );

    await productService.addProduct(data);
  };
  return { addProduct };
};
