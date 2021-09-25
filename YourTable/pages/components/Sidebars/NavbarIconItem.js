import React from "react";

function NavbarIconItem() {
  return (
    <div class="ml-3 relative">
      <div>
        <button
          class="text-xl text-gray-800 px-4 py-2 focus:outline-none"
          id="notificationsBtn"
        >
          <i class="far fa-bell"></i>
        </button>
      </div>

      <div
        id="notificationsDiv"
        class="hidden origin-top-right absolute right-0 mt-2 w-64
              rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5
              focus:outline-none"
      >
        <p class="p-2 text-sm text-gray-700">Not results...</p>
      </div>
    </div>
  );
}

export default NavbarIconItem;
