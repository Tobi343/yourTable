import React from "react";
import InfoCard from "./InfoCard";
import PeopleIcon from "@mui/icons-material/People";
import { Menu } from "@headlessui/react";
import SettingsIcon from '@mui/icons-material/Settings';
function CardContainer(props) {
  return (
    <div className="flex flex-wrap mx-6">
      <InfoCard
        color={props.Color}
        title="Reservierungen"
        count="10"
        icon={<PeopleIcon className="h-8 w-8" />}
      />
      <InfoCard
        color={props.Color}
        title="Kunden"
        count="20"
        icon={<PeopleIcon className="h-8 w-8" />}
      />
      <InfoCard
        color={props.Color}
        title="Freie Tische"
        count="92"
        icon={<PeopleIcon className="h-8 w-8" />}
      />
      <InfoCard
        color={props.Color}
        title="Reservierungen"
        count="10"
        icon={<PeopleIcon className="h-8 w-8" />}
      />
      <InfoCard
        color={props.Color}
        title="Kunden"
        count="20"
        icon={<PeopleIcon className="h-8 w-8" />}
      />
      <InfoCard
        color={props.Color}
        title="Freie Tische"
        count="92"
        icon={<PeopleIcon className="h-8 w-8" />}
      />{" "}
      <InfoCard
        color={props.Color}
        title="Reservierungen"
        count="10"
        icon={<PeopleIcon className="h-8 w-8" />}
      />
      <InfoCard
        color={props.Color}
        title="Kunden"
        count="20"
        icon={<PeopleIcon className="h-8 w-8" />}
      />
      <InfoCard
        color={props.Color}
        title="Freie Tische"
        count="92"
        icon={<PeopleIcon className="h-8 w-8" />}
      />
      <div className="w-full px-6 sm:w-1/2 xl:w-1/3" onClick={(e)=>prompt("click")}>
        <div className="flex items-center px-5 py-6 my-6 shadow-sm rounded-md bg-gray-200 hover:bg-gray-300">
          <div
            className={`p-3 rounded-full ${props.Color} bg-opacity-75 text-white`}
          >
            <SettingsIcon className="h-8 w-8" />
          </div>

          <div className="mx-5">
            <h4 className="text-2xl font-semibold text-gray-700">
              Ansichts einstellungen
            </h4>
            <div className="text-gray-500">Was soll angezeigt werden?</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardContainer;
