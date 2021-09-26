import React from "react";
import SideBarCard from "./SideBarCard";
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import DateRangeIcon from '@mui/icons-material/DateRange';

function Sidebar(props) {
  return (
    <aside
      id="v_SideBar"
      className={`${props.NavColorField} relative h-screen w-72 hidden sm:block shadow-xl transition duration-200 ease-in-out`}
    >     
      <div className="p-6">
        <a
          href="#"
          className="text-white text-3xl font-semibold hover:text-gray-100"
        >
          YourTable
        </a>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <SideBarCard Text="Dashboard" Icon={<DashboardIcon/>} Link="/"/>
        <SideBarCard Text="Reservierungen" Icon={<DateRangeIcon/>} Link="/Reservations"/>
        <SideBarCard Text="Mein Profil" Icon={<RestaurantIcon/>} Link="#"/>
        <SideBarCard Text="Einstellungen" Icon={<SettingsIcon/>} Link="#"/>
        <SideBarCard Text="Ausloggen" Icon={<LogoutIcon/>} Link="#"/>

      </nav>
    </aside>
  );
}

export default Sidebar;