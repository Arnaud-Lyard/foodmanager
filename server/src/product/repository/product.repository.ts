import { Product } from "@prisma/client";
import { NewProduct } from "../dto/product.dto";
import prisma from "../../../prisma/client";

export class ProductRepository {
  static async createProduct(product: NewProduct): Promise<Product> {
    return await prisma.product.create({
      data: product,
    });
  }
}
