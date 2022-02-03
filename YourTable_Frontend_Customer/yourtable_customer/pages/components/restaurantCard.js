import React from "react";

function restaurantCard(props) {
  return (
    <div
      class=" py-4 px-4 w-full"
      onClick={() => {
        props.indexState(props.index+1);
        console.log(props.index+1);
      }}
    >
      <div class=" ">
        <a href={"restaurants/"+props.index}>
          <div class="bg-white shadow p-2 rounded-lg text-gray-800 hover:shadow-lg">
            <div class="right-0 mt-4 rounded-l-full absolute text-center font-bold text-xs text-white px-2 py-1 bg-orange-500">
              0 Follower
            </div>
            <img
              src={props.restaurant.restaurant_image}
              class="h-32 rounded-lg w-full object-cover"
            />
            <div class="flex justify-center">
              <img
                src={props.restaurant.restaurant_logo}
                class="rounded-full -mt-6 border-4 object-center object-cover border-white mr-2 h-16 w-16"
              />
            </div>
            <div class="py-2 px-2">
              <div class=" font-bold font-title text-center">
                {props.restaurant.restaurant_name}
              </div>

              <div class="text-sm font-light text-center my-2">
                {props.restaurant.restaurant_address}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default restaurantCard;
