import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import LogoutIcon from "@heroicons/react/outline/LogoutIcon";
<<<<<<< HEAD
import LandingIcon from "@heroicons/react/outline/HomeIcon";
import MoonOutline from "@heroicons/react/outline/MoonIcon";
import SunOutline from "@heroicons/react/outline/SunIcon";
=======
import MoonOutline from "@heroicons/react/outline/MoonIcon";
import SunOutline from "@heroicons/react/outline/SunIcon";
import UserCircleIcon from "@heroicons/react/outline/UserCircleIcon";
>>>>>>> redux-update
import useDarkMode from "../hook/useDarkMode";
import { Link } from "react-router-dom";
// import useLogoDark from "../hook/useLogoDark";
// import DashboardIcon from "@heroicons/react/outline/ViewGridIcon";

export default function Dropdown({ onLogout }) {
  const [colorTheme, setTheme] = useDarkMode();
  // const [logo, setLogo] = useLogoDark();
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="focus:outline-none inline-flex w-full justify-center rounded-md   hover:bg-[rgba(0,0,0,0.06)]   items-center   py-1 sm:p-2 text-sm font-medium text-dText ">
            Settings
            <ChevronDownIcon
              className="ml-2 h-3 sm:h-5 sm:w-5 text-dText"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="focus:outline-none absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-secondary dark:bg-dSecondary shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onLogout}
                    className={`${
                      active
                        ? "bg-red-500 text-dText"
                        : "text-text dark:text-dText"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <LogoutIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <LogoutIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    Logout
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-third text-text"
                        : "text-text dark:text-dText"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={
                      () => setTheme(colorTheme)
                      // && setLogo(logo)
                    }
                  >
                    {colorTheme === "dark" ? (
                      <MoonOutline
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <SunOutline className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    {colorTheme === "dark" ? <>Dark</> : <>Light</>}
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
<<<<<<< HEAD
                    to="/"
                    className={`${
                      active
                        ? "bg-third text-text"
                        : "text-text dark:text-dText"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <LandingIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <LandingIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Home
=======
                    className={`${
                      active
                        ? "bg-sky-500 text-dText"
                        : "text-text dark:text-dText"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    to="/user/edit"
                  >
                    <UserCircleIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    User settings
>>>>>>> redux-update
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
