import React, { useState } from "react";
import InfoCard from "./InfoCard";
import PeopleIcon from "@mui/icons-material/People";
import { Menu } from "@headlessui/react";
import SettingsIcon from "@mui/icons-material/Settings";
import Modal from "../Modal";

function CardContainer(props) {
  const [items, setItems] = useState([
    { item: "Tische", number: 232, visible: true },
    { item: "Räume", number: 232, visible: false },
    { item: "Kunden heute", number: 232, visible: false },
    { item: "Kunden diese Woche", number: 232, visible: false },
    { item: "Kunden diesen Monat", number: 232, visible: false },
    { item: "Mitglied seit", number: "02.02.2022", visible: true },
    { item: "Durchschnittszeit pro Tisch", number: "02:30h", visible: false },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    { item: "Sample Statistic", number: 232, visible: true },
    
  ]);
  return (
    <div className="flex flex-wrap mx-6">
      {items.filter(e=>e.visible).map((e) => (
        <InfoCard
          color={props.Color}
          title={e.item}
          count={e.number}
          icon={<PeopleIcon className="h-8 w-8" />}
        />
      ))}

      <Modal Color={props.Color} itemsProp={items} setItemsProp={setItems}></Modal>
    </div>
  );
}

export default CardContainer;
