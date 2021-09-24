import React from 'react'

function MobileSideBar() {

    function handleClick(e) {
        e.preventDefault();
        sideBar.classList.toggle("-translate-x-full");
      }
    

    return (
        <div class="bg-gray-800 text-gray-100 flex justify-between md:hidden w-screen">
          <a href="#" class="block p-4 text-white font-bold">YourTable</a>

          <button onClick={handleClick} class="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          </button>
        </div>
        
    )
}

export default MobileSideBar
