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
            <button class="bg-orange-500 hover:bg-gray-700 text-white font-bold uppercase h-12 px-4 xl:px-6 py-2 xl:py-3 rounded flex-shrink-0 flex items-center">
              
              <span className="ml-4">In meiner Nähe</span>
            </button>
            <ul class="flex items-center text-sm font-bold">
              <li class="px-2 lg:px-3 flex items-center">
                <span>Kategorie 1</span>
                
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
