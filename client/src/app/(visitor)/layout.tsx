"use client";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import useCookie from "../../hooks/cookie/useCookie";
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "../../router/routes";
import { useLogout } from "../../hooks/auth/useLogout";
import Image from "next/image";
import { usePathname } from "next/navigation";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function VisitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState<string | null>("false");
  const [value] = useCookie("logged_in", "false");
  const { logout } = useLogout();
  const pathname = usePathname();

  useEffect(() => {
    setLoggedIn(value);
  }, [value]);

  const handleLogout = () => {
    logout();
    setLoggedIn("false");
  };

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-shrink-0 items-center">
                    <Image
                      className="h-8 w-auto"
                      src={"./next.svg"}
                      alt="Your Company"
                      width={1024}
                      height={1024}
                      priority={true}
                    />
                  </div>
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <Link
                      href={PUBLIC_ROUTES.HOME}
                      // className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      className={`link ${
                        pathname === PUBLIC_ROUTES.HOME
                          ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                          : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      Accueil
                    </Link>
                    <a
                      href="#"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Team
                    </a>
                    <a
                      href="/profile"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      Profile
                    </a>
                    {loggedIn === "true" ? (
                      // <Link
                      //   href={PROTECTED_ROUTES.LOGOUT}
                      //   className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      // >
                      //   Déconnection
                      // </Link>
                      <button
                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        onClick={handleLogout}
                      >
                        Déconnexion
                      </button>
                    ) : (
                      <Link
                        href={PUBLIC_ROUTES.LOGIN}
                        // className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        className={`link ${
                          pathname === PUBLIC_ROUTES.LOGIN
                            ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                            : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        Connection
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {loggedIn === "true" ? (
                      <Link href={PROTECTED_ROUTES.USER}>
                        <button
                          type="button"
                          className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          <HomeIcon
                            className="-ml-0.5 h-5 w-5"
                            aria-hidden="true"
                          />
                          Tableau de bord
                        </button>
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
                >
                  Dashboard
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Team
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Projects
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Calendar
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {children}
    </>
  );
}
