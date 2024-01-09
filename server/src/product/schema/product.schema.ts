import { TypeOf, object, string } from "zod";

export const addProductSchema = object({
  body: object({
    designation: string({
      required_error: "Designation is required",
    }).min(3, "Designation must be greater than 3 characters"),
    description: string({
      required_error: "Description is required",
    }).min(10, "Description must be greater than 10 characters"),
    price: string({
      required_error: "Price is required",
    }).min(1, "Price must be greater than 0"),
    capacity: string({
      required_error: "Capacity is required",
    }).min(1, "Capacity must be greater than 0"),
    year: string({
      required_error: "Year is required",
    }).min(4, "Year must be greater than 1900"),
  }),
  file: object({
    filename: string({
      required_error: "File name is required",
    }),
  }),
});

export type AddProductInput = TypeOf<typeof addProductSchema>["body"];
