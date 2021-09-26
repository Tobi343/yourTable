import React from "react";

function InfoCard(props) {
  return (
    <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
      <div class="flex items-center px-5 py-6 my-6 shadow-sm rounded-md bg-gray-200">
        <div class="p-3 rounded-full bg-indigo-600 bg-opacity-75 text-white">
            {props.icon}
        </div>

        <div class="mx-5">
          <h4 class="text-2xl font-semibold text-gray-700">{props.count}</h4>
          <div class="text-gray-500">{props.title}</div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
