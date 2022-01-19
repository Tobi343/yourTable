import React from "react";

function InfoCard(props) {
  return (
    <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
      <div className="flex items-center px-5 py-6 my-6 shadow-sm rounded-md bg-gray-200">
        <div
          className={`p-3 rounded-full ${props.color} bg-opacity-75 text-white`}
        >
          {props.icon}
        </div>

        <div className="mx-5">
          <h4 className="text-2xl font-semibold text-gray-700">
            {props.count}
          </h4>
          <div className="text-gray-500">{props.title}</div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
