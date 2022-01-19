import React from "react";

function navBar() {
  return (
    <nav class="w-full py-6 h-20 bg-white ">
      <div class="flex items-center justify-between mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4">
        <section class="flex items-center text-gray-900 space-x-2">
          <a
            href="#"
            class="font-bold text-xl outline-none rounded-lg hover:text-gray-400"
          >
            YOURTABLE
          </a>
        </section>
        <section>
          <ul class="md:space-x-8 space-x-6 text-gray-900 font-semibold hidden md:flex">
            <li class="relative group">
              <a
                href="#"
                class="outline-none rounded-lg text-orange-500"
              >
                Home
              </a>
              <div class="w-full h-0.5 bg-transparent group-hover:bg-orange-500 transition-al absolute bottom-0" />
            </li>
            <li class="relative group">
              <a
                href="#"
                class="outline-none rounded-lg"
              >
                Search
              </a>
              <div class="w-full h-0.5 bg-transparent group-hover:bg-orange-500 transition-al absolute bottom-0" />
            </li>
            <li class="relative group">
              <a
                href="#"
                class="outline-none rounded-lg"
              >
                Reservations
              </a>
              <div class="w-full h-0.5 bg-transparent group-hover:bg-orange-500 transition-al absolute bottom-0" />
            </li>
          </ul>
        </section>
        <section>

          <ul class="md:flex hidden space-x-4">
            <li>
              <a
                href="#"
                class="bg-transparent  px-4 py-1 rounded-xl border-orange-500 border-2 text-orange-500 font-semibold hover:bg-gray-100 active:bg-gray-200 outline-none"
              >
                Login
              </a>
            </li>

            <li>
              <a
                href="#"
                class="bg-orange-500  px-4 py-1 rounded-xl border-orange-500 border-2 text-gray-100 font-semibold hover:bg-gray-100 active:bg-gray-200 outline-none"
              >
                Register
              </a>
            </li>
          </ul>
        </section>
      </div>
    </nav>
  );
}

export default navBar;
