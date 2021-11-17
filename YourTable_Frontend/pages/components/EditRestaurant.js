import React from "react";
import Autocomplete from "react-google-autocomplete";

function EditRestaurant(props) {
  return (
    <div className="flex-1 h-full">
      <div className="font-bold text-gray-700 p-4 pl-6 text-xl mt-4 mb-5">
      {props.title}
      </div>
      <div className="flex flex-row ">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/usedado.appspot.com/o/29793231_1307220342744842_4532781675288985600_n.png?alt=media&token=adcc1c7c-f1b1-4444-bab8-4332deb037f7"
          className="rounded-full h-20 ml-6 mb-3"
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/usedado.appspot.com/o/Burgerista_Combo.jpg?alt=media&token=67d23c60-57c5-4da4-8a2e-1f7b59c47f5a"
          className="ml-10 h-20"
        />
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
            value={props.title.split(' ')[1]}
            placeholder="Max"
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
            onPlaceSelected={(place) =>{

              console.log(place)
              const arr = place.formatted_address.split(',')[1].split(' ');
              console.log(arr)
              console.log(place.geometry.location)
              if(arr.length > 2){
                plz.value = arr[1]
                city.value = arr[2]
               
              }
              else{
                city.value = arr[1]
                plz.value = "genauere Angabe bitte"
              }

            }}
            options={{
              types: ["address"],
              componentRestrictions: { country: "at" },
            }}
            placeholder="Mustergasse 10/9"
          />
        </div>
        <div className="flex flex-col mx-6 my-3">
          <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
            Postleitzahl
          </p>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="plz"
            type="fname"
            placeholder="0000"
          />
        </div>
        <div className="flex flex-col mx-6 my-3">
          <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
            Stadt
          </p>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="lname"
            placeholder="Musterort"
          />
        </div>
        
      </div>
    </div>
  );
}

export default EditRestaurant;
