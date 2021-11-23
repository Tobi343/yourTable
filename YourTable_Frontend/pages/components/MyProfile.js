import React, { useState } from "react";

function MyProfile(props) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex-1 h-full">
      <div className="font-bold text-gray-700 p-4 pl-6 text-xl mt-4 mb-5">
        {props.title}
      </div>
      <div className=" rounded-full">
        <img
          src="/sample-profile.png"
          className="rounded-full h-20 ml-6 mb-3"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col mx-6 my-3">
          <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
            First Name
          </p>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstNameProfileEdit"
            type="fname"
            placeholder="Max"
          />
        </div>
        <div className="flex flex-col mx-6 my-3">
          <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
            Last Name
          </p>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastNameProfileEdit"
            type="lname"
            placeholder="Mustermann"
          />
        </div>
        <div className="flex flex-col mx-6 my-3 lg:col-span-2">
          <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
            Email Adresse
          </p>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="emailProfileEdit"
            type="email"
            placeholder="max.mustermann@example.com"
          />
        </div>
        {edit ? (
          <div className="flex h-12 mt-5">
            <button
              onClick={() => setEdit(false)}
              className=" bg-green-500 text-lg h-12 text-center inline-block w-28 rounded-xl text-white font-bold ml-6 "
            >
              Save
            </button>

            <button
              onClick={() => setEdit(false)}
              className="bg-red-500 text-lg h-12 text-center inline-block w-28 rounded-xl text-white font-bold ml-6 "
            >
              Abort
            </button>
          </div>
        ) : (
          <div className="flex h-12 mt-5">
            <button
              className="bg-blue-500 text-lg h-12 text-center inline-block w-28 rounded-xl text-white font-bold ml-6 "
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
