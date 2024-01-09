export type Product = {
  id: string;
  designation: string;
  description: string;
  price: number;
  capacity: number;
  image: string;
  year: number;
};

export type NewProduct = Omit<Product, "id" | "image">;
