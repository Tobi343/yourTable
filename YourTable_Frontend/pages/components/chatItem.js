import React from "react";

function chatItem(props) {
  return (
    <div className={`${props.self ? 'col-start-6 col-end-13' : 'col-start-1 col-end-8'} p-3 rounded-lg`}>
      <div className={`flex items-center ${!props.self ?'flex-row' : 'justify-start flex-row-reverse'}`}>
        <div className={`flex text-white items-center justify-center h-10 w-10 rounded-full ${props.color} flex-shrink-0`}>
        {props.name == undefined ? "E" : props.name.substring(0,1).toUpperCase()}

        </div>
        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>{props.message}</div>
        </div>
      </div>
    </div>
  );
}

export default chatItem;
