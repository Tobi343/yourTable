import NavBar from "./components/navBar";
import RestaurantCard from "./components/restaurantCard";
import SearchComponent from "./components/searchComponent";
import React, { useState, useEffect } from "react";
import Restaurant from "./restaurants/[restaurant]";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("Session: " + session);
  var successful = false;
  if (!session) {
    successful = true;
  }
  console.log(successful);
  const res = await fetch(`http://34.139.40.48/restaurant`);
  const restaurants = await res.json();
  return {
    props: {
      restaurants,
      successful,
    },
  };
}
const handleLogin = (email, password) => {
  console.log(email + " " + password);
  const register = "false";
  signIn("credentials", {
    email,
    password,
    register,
    // The page where you want to redirect to after a
    // successful login
  });
};

function search({ restaurants, successful }) {
  const [restaurantIndex, setRestaurantIndex] = useState(0);
  let [isOpen, setIsOpen] = useState(/*successful*/);

  return (
    <div className="flex-col h-full bg-gray-600">
      <NavBar
        className=""
        active={2}
        successful={successful}
        setIsOpen={setIsOpen}
      ></NavBar>

      <>
        {isOpen ? (
          <>
            <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative my-6 mx-auto max-w-6xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  {/*body*/}
                  <div class=" flex flex-col items-center justify-center bg-gray-300">
                    <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                      <div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">
                        Login To Your Account
                      </div>
                      <button class="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
                        <span class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500">
                          <i class="fab fa-facebook-f"></i>
                        </span>
                        <span>Login with Facebook</span>
                      </button>
                      <div class="relative mt-10 h-px bg-gray-300">
                        <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
                          <span class="bg-white px-4 text-xs text-gray-500 uppercase">
                            Or Login With Email
                          </span>
                        </div>
                      </div>
                      <div class="mt-10">
                        <form
                          action="#"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin(email.value, password.value);
                          }}
                        >
                          <div class="flex flex-col mb-6">
                            <label
                              for="email"
                              class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                            >
                              E-Mail Address:
                            </label>
                            <div class="relative">
                              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <svg
                                  class="h-6 w-6 m-0"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                              </div>

                              <input
                                id="email"
                                type="email"
                                name="email"
                                class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                placeholder="E-Mail Address"
                              />
                            </div>
                          </div>
                          <div class="flex flex-col mb-6">
                            <label
                              for="password"
                              class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                            >
                              Password:
                            </label>
                            <div class="relative">
                              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                <span>
                                  <svg
                                    class="h-6 w-6 m-0"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                  </svg>
                                </span>
                              </div>

                              <input
                                id="password"
                                type="password"
                                name="password"
                                class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                placeholder="Password"
                              />
                            </div>
                          </div>

                          <div class="flex items-center mb-6 -mt-4">
                            <div class="flex ml-auto">
                              <a
                                href="#"
                                class="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700"
                              >
                                Forgot Your Password?
                              </a>
                            </div>
                          </div>

                          <div class="flex w-full">
                            <button
                              type="submit"
                              class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                            >
                              <span class="mr-2 uppercase">Login</span>
                              <span>
                                <svg
                                  class="h-6 w-6 m-0"
                                  fill="none"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </span>
                            </button>
                          </div>
                        </form>
                      </div>
                      <div class="flex justify-center items-center mt-6">
                        <a
                          href="#"
                          target="_blank"
                          class="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
                        >
                          <span class="ml-2">
                            You don't have an account? -{" "}
                          </span>
                        </a>
                        <a
                          href="/"
                          onClick={(e) => setIsOpen(false)}
                          class="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
                        >
                          <span class="ml-2">I just want to look</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>

      <SearchComponent
        restaurant={restaurants}
        setRestaurant={setRestaurantIndex}
      />
    </div>
  );
}

export default search;
