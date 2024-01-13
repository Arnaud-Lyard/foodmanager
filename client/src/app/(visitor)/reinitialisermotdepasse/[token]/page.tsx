"use client";
import { useState, type ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useResetPassword } from "../../../../hooks/password/useResetPassword";
import { useParams } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { resetPassword } = useResetPassword();
  const router = useRouter();
  const params = useParams<{ token: string }>();
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password) {
      alert("Please enter information");
    } else if (password !== passwordConfirm) {
      alert("Passwords do not match");
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters");
    } else {
      if (!params) return;
      resetPassword({ password, passwordConfirm, token: params.token })
        .then((res) => router.push("/"))
        .catch((e) => alert(e));
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={submitForm}
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="passwordConfirm"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password confirm
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  autoComplete="current-password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Modifier le mot de passe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
