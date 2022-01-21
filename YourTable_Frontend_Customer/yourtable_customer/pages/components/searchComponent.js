import React from "react";
import RestaurantCard from "./restaurantCard";
import { useState } from "react";
import Link from "next/link";

function searchComponent(props) {
  const [restaurants, setRestaurants] = useState(props.restaurant);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <header class="sticky top-0 z-50 bg-white shadow-sm">
        <div class="bg-gray-100 rounded-md flex items-center mx-2 xl:mx-28 lg:mx-20 md:mx-14  mb-8">
          <select
            class="bg-transparent uppercase font-bold text-sm p-4 mr-4"
            name=""
            id=""
          >
            <option>Alle Kategorien</option>
            <option>Fast Food</option>
            <option>Sterne Restaurant</option>
            <option>Fisch</option>
          </select>
          <input
            className="border-l border-gray-300 bg-transparent font-semibold text-sm pl-4 h-12 w-full"
            type="text"
            id="search"
            name="search"
            onChange={(x) => {
              setSearchQuery(x.target.value);
            }}
            placeholder="Ich suche nach ..."
          />
        </div>

        <hr />
        <div class="mx-2 xl:mx-28 lg:mx-20 md:mx-14 py-2 flex items-center">
          <nav class="hidden xl:contents ml-8">
            <button class="bg-orange-500 hover:bg-gray-700 text-white font-bold uppercase px-4 xl:px-6 py-2 xl:py-3 rounded flex-shrink-0 flex items-center">
              <svg
                width="21px"
                height="21px"
                viewBox="0 0 21 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fill-rule="evenodd" transform="translate(2 2)">
                  <path
                    d="m8.5 14.5c3.3285018 0 6-2.6447124 6-5.97321429 0-3.32850184-2.6714982-6.02678571-6-6.02678571-3.32850184 0-6 2.69828387-6 6.02678571 0 3.32850189 2.67149816 5.97321429 6 5.97321429z"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <circle cx="8.5" cy="8.5" fill="currentColor" r="3.5" />
                  <g
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m.5 8.5h2" />
                    <path d="m14.5 8.5h2" />
                    <path d="m7.5 1.5h2" transform="matrix(0 1 -1 0 10 -7)" />
                    <path d="m7.5 15.5h2" transform="matrix(0 1 -1 0 24 7)" />
                  </g>
                </g>
              </svg>

              <span className="ml-4">In meiner Nähe</span>
            </button>
            <ul class="flex items-center text-sm font-bold">
              <li class="px-2 lg:px-3 flex items-center">
                <span>Kategorie 1</span>
                <svg
                  class="ml-1 h-7 lg:h-8 p-2 pr-0 text-gray-500"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="chevron-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="svg-inline--fa fa-chevron-down fa-w-14 fa-9x"
                >
                  <path
                    fill="currentColor"
                    d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"
                  ></path>
                </svg>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div class="flex flex-wrap flex-1 min-h-screen">
        {restaurants
          .filter((res) => {
            const resName = res.restaurant_name.toLowerCase();
            console.log(resName);
            console.log(searchQuery.toLowerCase());
            return resName.includes(searchQuery.toLowerCase());
          })
          .map((e, i) => (
            <Link href={"/restaurant/"+i}>
              <RestaurantCard
                restaurant={e}
                index={i}
                indexState={props.setRestaurant}
              />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default searchComponent;
