import React from "react";
import SideBarCard from "./SideBarCard";
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import DateRangeIcon from '@mui/icons-material/DateRange';

function MobileSideBar() {
  return (
    <header id="MobileBar" className="w-full py-5 px-6 sm:hidden  bg-gray-500">
       <SideBarCard Text="Dashboard" Icon={<DashboardIcon/>} Link="/"/>
        <SideBarCard Text="Reservierungen" Icon={<DateRangeIcon/>} Link="/Reservations"/>
        <SideBarCard Text="Mein Profil" Icon={<RestaurantIcon/>} Link="#"/>
        <SideBarCard Text="Einstellungen" Icon={<SettingsIcon/>} Link="#"/>
        <SideBarCard Text="Ausloggen" Icon={<LogoutIcon/>} Link="#"/>
    </header>
  );
}

export default MobileSideBar;
