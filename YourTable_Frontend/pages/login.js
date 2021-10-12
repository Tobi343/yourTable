import React from "react";

function login() {
  return (
    <div className="bg-gray-300 flex h-screen">
      <div className="mx-8 w-full shadow-md flex lg:mx-64 md:mx-32 md:my-20">
        <div className="bg-gray-100 flex-1">
          <form className="md:mx-20 mx-4 mt-10">
            <div>
              <span className="text-sm text-gray-900">Welcome back</span>
              <h1 className="text-2xl font-bold">Login to your account</h1>
            </div>
            
            <div className="my-3">
              <label className="block text-md mb-2" for="email">
                Email
              </label>
              <input
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="email"
                name="password"
                placeholder="email"
              />
            </div>

            <div className="mt-5">
              <label className="block text-md mb-2" for="password">
                Password
              </label>
              <input
                className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                type="password"
                name="password"
                placeholder="password"
              />
            </div>

            <div className="flex justify-between">
              <div>
                <input className="cursor-pointer" type="radio" name="rememberme" />
                <span className="text-sm">Remember Me</span>
              </div>
              <span className="text-sm text-blue-700 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="">
              <button className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100">
                Login now
              </button>
              <div className="flex  space-x-2 justify-center items-end bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">
                <button>Or sign-in with google</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;
