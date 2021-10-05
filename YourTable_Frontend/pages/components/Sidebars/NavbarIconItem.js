import React from "react";

function NavbarIconItem() {
  return (
    <div className="ml-3 relative">
      <div>
        <button
          className="text-xl text-gray-800 px-4 py-2 focus:outline-none"
          id="notificationsBtn"
        >
          <i className="far fa-bell"></i>
        </button>
      </div>

      <div
        id="notificationsDiv"
        className="hidden origin-top-right absolute right-0 mt-2 w-64
              rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5
              focus:outline-none"
      >
        <p className="p-2 text-sm text-gray-700">Not results...</p>
      </div>
    </div>
  );
}

export default NavbarIconItem;
