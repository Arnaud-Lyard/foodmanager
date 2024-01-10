import { useRef, useState, type ReactElement } from "react";
import Notification from "../components/Notification";
import { useAddProduct } from "../hooks/product/useAddProduct";
import { NotificationType } from "../types/notification";
import DashboardLayout from "./DashboardLayout";
import type { NextPageWithLayout } from "./_app";
import { PhotoIcon } from "@heroicons/react/24/outline";

const Product: NextPageWithLayout = () => {
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [capacity, setCapacity] = useState("0,75");
  const [notification, setNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<NotificationType>(
    NotificationType.SUCCESS
  );
  const [notificationMessage, setNotificationMessage] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { addProduct } = useAddProduct();

  const handleResetForm = () => {
    if (inputRef.current) inputRef.current.value = "";

    setDesignation("");
    setDescription("");
    setFile(null);
    setPrice("");
    setYear("");
    setCapacity("");
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("designation", designation);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("year", year);
    formData.append("capacity", capacity);

    addProduct(formData)
      .then(() => {
        setNotification(true);
        setNotificationType(NotificationType.SUCCESS);
        setNotificationMessage("Product created successfully.");
        setTimeout(() => {
          setNotification(false);
        }, 5000);
        handleResetForm();
      })
      .catch((e) => {
        setNotification(true);
        setNotificationType(NotificationType.ERROR);
        setNotificationMessage(
          e.response.data.message ?? e.response.data.errors[0].message
        );
        setTimeout(() => {
          setNotification(false);
        }, 5000);
      });
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    setFile(droppedFiles[0]);
  };

  return (
    <>
      <Notification
        isVisible={notification}
        notificationType={notificationType}
        message={notificationMessage}
      />

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
                  />
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about the product.
                  </p>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Image
                </label>
                <div
                  className="mt-2 sm:col-span-2 sm:mt-0"
                  onDrop={handleDrop}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center text-sm leading-6 text-gray-600">
                      {file ? (
                        <p>{file.name}</p>
                      ) : (
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                      )}
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file"
                            ref={inputRef}
                            type="file"
                            name="file"
                            accept="image/*"
                            multiple={false}
                            onChange={handleUploadImage}
                            required
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>
                </div>
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
                  step={0.01}
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  min={1900}
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
                  defaultValue={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="0.75">0,75</option>
                  <option value="0.375">0,375</option>
                  <option value="1.5">1,5</option>
                  <option value="3">3</option>
                </select>
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
    </>
  );
};

Product.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Product;
