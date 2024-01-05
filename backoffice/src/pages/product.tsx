import { useState, type ReactElement, useRef } from "react";
import DashboardLayout from "./DashboardLayout";
import type { NextPageWithLayout } from "./_app";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAddProduct } from "../hooks/product/useAddProduct";

const Product: NextPageWithLayout = () => {
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { addProduct } = useAddProduct();

  const handleResetForm = () => {
    if (inputRef.current) inputRef.current.value = "";

    setDesignation("");
    setDescription("");
    setImage(null);
    setPrice(0);
    setYear(0);
    setCapacity(0);
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { designation, description, image, price, year, capacity };
    // addProduct(data)
    //   .then(() => {
    //     handleResetForm();
    //   })
    //   .catch((e) => {});
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <form action="#" method="POST" onSubmit={submitForm}>
      <div className="space-y-12 sm:space-y-16">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Product
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            The product will be add to the store.
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="designation"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Designation
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="designation"
                    id="designation"
                    autoComplete="designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Product designation"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Description
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about the product.
                </p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  ref={inputRef}
                  type="file"
                  name="file"
                  accept="image/*"
                  multiple={false}
                  onChange={handleUploadImage}
                  required
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Details
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            Add product details.
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Price
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  name="price"
                  id="price"
                  autoComplete="price"
                  value={price === 0 ? "" : price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="year"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Year
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="number"
                  name="year"
                  id="year"
                  autoComplete="year"
                  value={year === 0 ? "" : year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="capacity"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Capacity
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  id="capacity"
                  name="capacity"
                  autoComplete="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(parseInt(e.target.value))}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>0.75</option>
                  <option>0.375</option>
                  <option>1.5</option>
                  <option>3</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => {
            handleResetForm();
          }}
        >
          Reset
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

Product.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Product;
