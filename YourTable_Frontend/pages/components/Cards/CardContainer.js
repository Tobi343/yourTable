import React from "react";
import InfoCard from "./InfoCard";
import PeopleIcon from '@mui/icons-material/People';



function CardContainer() {
  return (
        <div className="flex flex-wrap mx-6">
          <InfoCard
            title="Reservierungen"
            count="10"
            icon={<PeopleIcon className="h-8 w-8"/>}
          />
          <InfoCard
            title="Kunden"
            count="20"
            icon={<PeopleIcon className="h-8 w-8"/>}
          />
          <InfoCard
            title="Freie Tische"
            count="92"
            icon={<PeopleIcon className="h-8 w-8"/>}
          />
              <InfoCard
            title="Reservierungen"
            count="10"
            icon={<PeopleIcon className="h-8 w-8"/>}
          />
          <InfoCard
            title="Kunden"
            count="20"
            icon={<PeopleIcon className="h-8 w-8"/>}
          />
          <InfoCard
            title="Freie Tische"
            count="92"
            icon={<PeopleIcon className="h-8 w-8"/>}
          />    <InfoCard
          title="Reservierungen"
          count="10"
          icon={<PeopleIcon className="h-8 w-8"/>}
        />
        <InfoCard
          title="Kunden"
          count="20"
          icon={<PeopleIcon className="h-8 w-8"/>}
        />
        <InfoCard
          title="Freie Tische"
          count="92"
          icon={<PeopleIcon className="h-8 w-8"/>}
        />
    </div>
  );
}

export default CardContainer;
