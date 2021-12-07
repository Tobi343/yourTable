import React from "react";
import Autocomplete from "react-google-autocomplete";

function CreateRestaurant() {
  return (
    <div className="flex-1 h-full">
      <div className="font-bold text-gray-700 p-4 pl-6 text-xl mt-4 mb-5">
      </div>
      <div className="flex flex-row ">
      <img
          src="/sample-profile.png"
          className="rounded-full h-20 ml-6 mb-3"
        />
        <img src="/light-gray-color-solid-background-1920x1080.png" className="ml-10 h-20 " />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col mx-6 my-3">
          <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
            Name
          </p>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="fname"
            placeholder="Muster Restaurant"
          />
        </div>

        <div className="flex flex-col mx-6 my-3 lg:col-span-2">
          <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
            Restaurant Adresse
          </p>
          <Autocomplete
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            apiKey={"AIzaSyBkTbnMGvVSmm1JEAweSZgy6BH1iRnwZ8Y"}
            onPlaceSelected={(place) => {
              console.log(place);
              const arr = place.formatted_address.split(",")[1].split(" ");
              console.log(arr);
              console.log(place.geometry.location);
              
            }}

            options={{
              types: ["address"],
              componentRestrictions: { country: "at" },
            }}
            placeholder="Mustergasse 10/9"
          />
        </div>

        <div className="flex flex-col mx-6 my-3 lg:col-span-2">
          <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
            Beschreibung
          </p>
          <textarea 
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
            type="text"
            placeholder="Bla Bla Bla"
          />
        </div>

        <div className="flex h-12 mt-5">
          <button
            className="bg-blue-500 text-lg h-12 text-center inline-block w-28 rounded-xl text-white font-bold ml-6 "
            onClick={() => props.click(restaurant)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateRestaurant;
