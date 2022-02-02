import React, { useState } from "react";
import InfoCard from "./InfoCard";
import PeopleIcon from "@mui/icons-material/People";
import { Menu } from "@headlessui/react";
import SettingsIcon from "@mui/icons-material/Settings";
import Modal from "../Modal";

function CardContainer(props) {
  const [items, setItems] = useState([
    { item: "facebook", number: 232, visible: true },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: true },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: true },
    { item: "facebook", number: 232, visible: true },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
    { item: "facebook", number: 232, visible: false },
  ]);
  return (
    <div className="flex flex-wrap mx-6">
      {items.map((e) => (
        <InfoCard
          color={props.Color}
          title={e.item}
          count={e.number}
          icon={<PeopleIcon className="h-8 w-8" />}
        />
      ))}

      <Modal Color={props.Color} itemsProp={items}></Modal>
    </div>
  );
}

export default CardContainer;
