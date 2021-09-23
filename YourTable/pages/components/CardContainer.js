import React from "react";
import InfoCard from "./InfoCard";

function CardContainer() {
  return (
        <div className="grid my-10 grid-cols-1 2xl:grid-cols-4 gap-14 xl:grid-cols-2">
          <InfoCard
            title="Reservierungen"
            color="bg-red-500"
            count="10"
            info="Reservierungen für heute geplannt!"
          />
          <InfoCard
            title="Kunden"
            color=" bg-green-500"
            count="20"
            info="Kunden für heute erwartet!"
          />
          <InfoCard
            title="Freie Tische"
            color=" bg-blue-500"
            count="92"
            info="Nicht reservierte Tische!"
          />
          <InfoCard
            title="Profilansichten"
            color=" bg-yellow-500"
            count="20"
            info="Anischten des Restaurants!"
          />
          <InfoCard
            title="Reservierungen"
            color="bg-red-500"
            count="10"
            info="Reservierungen für heute geplannt!"
          />
          <InfoCard
            title="Kunden"
            color=" bg-green-500"
            count="20"
            info="Kunden für heute erwartet!"
          />
          <InfoCard
            title="Freie Tische"
            color=" bg-blue-500"
            count="92"
            info="Nicht reservierte Tische!"
          />
          <InfoCard
            title="Profilansichten"
            color=" bg-yellow-500"
            count="20"
            info="Anischten des Restaurants!"
          />
          <InfoCard
            title="Reservierungen"
            color="bg-red-500"
            count="10"
            info="Reservierungen für heute geplannt!"
          />
          <InfoCard
            title="Kunden"
            color=" bg-green-500"
            count="20"
            info="Kunden für heute erwartet!"
          />
          <InfoCard
            title="Freie Tische"
            color=" bg-blue-500"
            count="92"
            info="Nicht reservierte Tische!"
          />
          <InfoCard
            title="Profilansichten"
            color=" bg-yellow-500"
            count="20"
            info="Anischten des Restaurants!"
          />
    </div>
  );
}

export default CardContainer;
