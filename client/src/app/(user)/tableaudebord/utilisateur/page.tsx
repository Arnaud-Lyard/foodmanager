"use client";
import { useState } from "react";
import { useUser } from "../../../../hooks/auth/useUser";
import Notification from "../../../../components/Notification";
import { useUpload } from "../../../../hooks/image/useUpload";
import { NotificationType } from "../../../../types/notification";

export default function Dashboard() {
  const { user, mutate } = useUser();
  const { upload } = useUpload();
  const [file, setFile] = useState<File | "">("");
  const [notification, setNotification] = useState(false);
  const [notificationType, setNotificationType] = useState<NotificationType>(
    NotificationType.SUCCESS
  );
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setNotification(true);
      setNotificationType(NotificationType.ERROR);
      setNotificationMessage("You need to select a file before uploading it.");
      setTimeout(() => {
        setNotification(false);
      }, 5000);
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    upload(formData)
      .then(() => {
        setNotification(true);
        setNotificationType(NotificationType.SUCCESS);
        setNotificationMessage("File uploaded successfully.");
        setTimeout(() => {
          setNotification(false);
        }, 5000);
      })
      .catch((e: any) => {
        setNotification(true);
        setNotificationType(NotificationType.ERROR);
        setNotificationMessage(
          e.response.data.message ?? e.response.data.errors[0].message
        );
        setTimeout(() => {
          setNotification(false);
        }, 5000);
      });
    await mutate();
    setFile("");
  };

  return (
    <div>
      <Notification
        isVisible={notification}
        notificationType={notificationType}
        message={notificationMessage}
      />

      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Administrator Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.name}
            </dd>
          </div>
          <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Application for
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.role}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.email}
            </dd>
          </div>
          <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Attachments
            </dt>
            <dd className="flex mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <form onSubmit={submitForm}>
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  multiple={false}
                  onChange={handleFileChange}
                />
                <button
                  type="submit"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </form>{" "}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
