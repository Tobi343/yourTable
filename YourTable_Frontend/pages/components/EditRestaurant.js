import React from "react";
import { useState, useEffect } from "react";
import Autocomplete from "react-google-autocomplete";
import Toggle from "react-toggle";

function EditRestaurant(props) {
  const [restaurant, setRestaurant] = useState(props.restaurant);
  const [enabled, setEnabled] = useState(false);
  const [image, setImage] = useState({
    preview: props.restaurant.restaurant_logo,
    raw: "",
  });

  const handleChange = (e) => {
    console.log({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
    if (e.target.files.length) {
      var binaryData = [];
      binaryData.push(e.target.files[0]);
      window.URL.createObjectURL(
        new Blob(binaryData, { type: "application/zip" })
      );
      setImage({
        preview: window.URL.createObjectURL(
          new Blob(binaryData, { type: "application/zip" })
        ),

        raw: e.target.files[0],
      });
    }
  };

  useEffect(() => {
    setRestaurant(props.restaurant);
  }, [props.restaurant]);

  function ImageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {};
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div className="flex-1 h-full">
      <div className="bg-white block">
        <div className="">
          <div className="w-full bg-blue-500  h-48 rounded-t-lg">
            <img
              src={restaurant.restaurant_image}
              className="object-cover w-full h-48"
            />
          </div>
          <div className="absolute -mt-20 ml-5">
            <div className="bg-gray-200 border border-gray-300 h-36 w-36 rounded-lg shadow-md border-b border-primary">
              <label htmlFor="upload-button">
                <img
                  src={restaurant.restaurant_logo}
                  className="object-cover h-36 w-36 rounded-lg"
                />
              </label>
            </div>
          </div>
        </div>
        <input
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleChange}
        />

        <div className="bg-primary border border-primary rounded-b-lg p-5 pt-20 flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col mx-6 my-3">
              <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                Name
              </p>
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="fname"
                onChange={(e) => {
                  setRestaurant({
                    ...restaurant,
                    ["restaurant_name"]: e.target.value,
                  });
                }}
                value={restaurant.restaurant_name}
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
                value={restaurant.restaurant_address}
                onChange={(e) => {
                  setRestaurant({
                    ...restaurant,
                    ["restaurant_address"]: e.target.value,
                  });
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
                onChange={(e) => {
                  setRestaurant({ ...restaurant, ["details"]: e.target.value });
                }}
                value={restaurant.details}
                placeholder="Bla Bla Bla"
              />
            </div>

            <div className="flex flex-col mx-6 my-3 lg:col-span-2">
              <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                Normale Öffnungszeiten / Reservierungszeiten
              </p>
              <div class="grid gap-4 grid-cols-2 md:grid-cols-4">
                <p>Montag</p>
                <label>
                  <Toggle
                    defaultChecked={enabled}
                    icons={false}
                    onChange={(e)=>e.target.COMMENT_NODE}
                  />
                  <span>Close</span>
                </label>
                <p>1</p>
                <p>1</p>
                <p>Dienstag</p>
                <label>
                  <Toggle
                    defaultChecked={enabled}
                    icons={false}
                    onChange={(e)=>e.target.COMMENT_NODE}
                  />
                  <span>Open</span>
                </label>
                <p>1</p>
                <p>1</p>
                <p>Mittwoch</p>
                <label>
                  <Toggle
                    defaultChecked={enabled}
                    icons={false}
                    onChange={(e)=>e.target.COMMENT_NODE}
                  />
                  <span>Close</span>
                </label>
                <p>1</p>
                <p>1</p>
              </div>
            </div>

            <div className="flex h-12 mt-5">
              <button
                className="bg-green-500 text-lg h-12 text-center inline-block w-28 rounded-xl text-white font-bold ml-6 "
                onClick={() => {
                  setRestaurant({
                    ...restaurant,
                    ["restaurant_layout"]: props.tables,
                  });
                  console.log(restaurant);
                  props.click(restaurant);
                }}
              >
                Save
              </button>
              <button
                className="bg-blue-500 text-md h-12 text-center inline-block w-36 rounded-xl text-white font-bold ml-6 "
                onClick={(e) => props.edit(true)}
              >
                Edit Layout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditRestaurant;
