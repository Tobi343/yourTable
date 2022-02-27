import React from "react";
import SideBarCard from "./SideBarCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ForumIcon from "@mui/icons-material/Forum";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import ColorContext from "../../contexts/ColorContext";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

function Sidebar(props) {
  const {color, setColor} = useContext(ColorContext);

  return (
    <aside
      id="v_SideBar"
      className={`bg-orange-500 h-screen w-72 hidden md:block sticky shadow-xl  transition duration-200 ease-in-out`}
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
        <SideBarCard
          Text="Dashboard"
          Icon={<DashboardIcon className="mr-3" />}
          Link="/"
        />
        <SideBarCard
          Text="Reservierungen"
          Icon={<DateRangeIcon className="mr-3" />}
          Link="/Reservations"
        />
        <SideBarCard
          Text="Chats"
          Icon={<ForumIcon className="mr-3" />}
          Link="/chat"
        />
        <SideBarCard
          Text="Meine Restaurants"
          Icon={<RestaurantIcon className="mr-3" />}
          Link="/myProfile"
        />
        <SideBarCard
          Text="QR-Code"
          Icon={<QrCodeScannerIcon className="mr-3" />}
          Link="/qrCodeScanner"
        />
        <SideBarCard
          Text="Ausloggen"
          Icon={<LogoutIcon className="mr-3" />}
          Link="/"
          onClick={(e)=>signOut()}
          
        />
      </nav>
    </aside>
  );
}

export default Sidebar;
