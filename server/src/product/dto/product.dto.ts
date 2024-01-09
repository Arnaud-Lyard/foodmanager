export type Product = {
  id: string;
  designation: string;
  description: string;
  price: string;
  capacity: string;
  image: string;
  year: string;
};

export type NewProduct = Omit<Product, "id">;
