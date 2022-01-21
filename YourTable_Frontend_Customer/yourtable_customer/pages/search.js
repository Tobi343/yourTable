import NavBar from "./components/navBar";
import RestaurantCard from "./components/restaurantCard";
import SearchComponent from "./components/searchComponent";
import React, { useState, useEffect } from "react";
import Restaurant from "./restaurants/[restaurant]";

export async function getServerSideProps(context) {
  /*const session =  await getSession(context)
  console.log("Session: "+session.accessToken)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }*/
  const res = await fetch(`http://34.139.40.48/restaurant`);
  const restaurants = await res.json();
  return {
    props: {
      restaurants,
    },
  };
}

function search({ restaurants }) {
  const [restaurantIndex, setRestaurantIndex] = useState(0);


  return (
    <div className="flex-col h-full bg-gray-600">
      <NavBar className="" active={2}></NavBar>
        <SearchComponent
          restaurant={restaurants}
          setRestaurant={setRestaurantIndex}
        />
    </div>
  );
}

export default search;
