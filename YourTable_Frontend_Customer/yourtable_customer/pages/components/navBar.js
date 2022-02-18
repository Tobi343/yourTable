import { React, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";

function navBar(props) {
  return (
    <nav className="w-full py-6 h-20 bg-white ">
      <div className="flex items-center justify-between mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4">
        <section className="flex items-center text-gray-900 space-x-2">
          <a
            href="/"
            className="font-bold text-xl outline-none rounded-lg hover:text-gray-400"
          >
            YOURTABLE
          </a>
        </section>
        <section>
          <ul className="md:space-x-8 space-x-6 text-gray-900 font-semibold hidden md:flex">
            <li className="relative group">
              <a
                href="/"
                className={`outline-none rounded-lg ${
                  props.active == 1 ? "text-orange-500" : ""
                }`}
              >
                Home
              </a>
              <div className="w-full h-0.5 bg-transparent group-hover:bg-orange-500 transition-al absolute bottom-0" />
            </li>
            <li className="relative group">
              <a
                href="/search"
                className={`outline-none rounded-lg ${
                  props.active == 2 ? "text-orange-500" : ""
                }`}
              >
                Search
              </a>
              <div className="w-full h-0.5 bg-transparent group-hover:bg-orange-500 transition-al absolute bottom-0" />
            </li>
            <li className="relative group">
              <a
                href="/reservations"
                className={`outline-none rounded-lg ${
                  props.active == 3 ? "text-orange-500" : ""
                }`}
              >
                Reservations
              </a>
              <div className="w-full h-0.5 bg-transparent group-hover:bg-orange-500 transition-al absolute bottom-0" />
            </li>
          </ul>
        </section>
        <section>
          {props.successful ? (
            <ul className="md:flex hidden space-x-4">
              <li>
                <a
                  href="#"
                  onClick={(e) => props.setIsOpen(true)}
                  className="bg-transparent  px-4 py-1 rounded-xl border-orange-500 border-2 text-orange-500 font-semibold hover:bg-orange-500 hover:text-white active:bg-gray-200 outline-none"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-orange-500  px-4 py-1 rounded-xl border-orange-500 border-2 text-gray-100 font-semibold hover:bg-white hover:text-orange-500 active:bg-gray-200 outline-none"
                >
                  Register
                </a>
              </li>
            </ul>
          ) : (
            <ul className="md:flex hidden space-x-4">
              <li>
                <a
                  href="#"
                  onClick={(e)=>signOut()}
                  className="bg-transparent  px-4 py-1 rounded-xl border-orange-500 border-2 text-orange-500 font-semibold hover:bg-orange-500 hover:text-white active:bg-gray-200 outline-none"
                >
                  Logout
                </a>
              </li>
            </ul>
          )}
        </section>
      </div>
    </nav>
  );
}

export default navBar;
