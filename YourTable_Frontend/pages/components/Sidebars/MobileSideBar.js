import React from "react";
import SideBarCard from "./SideBarCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ForumIcon from "@mui/icons-material/Forum";
import { signOut } from "next-auth/react";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

function MobileSideBar() {
  return (
    <header
      id="MobileBar"
      className="w-full py-5 px-6 md:hidden hidden bg-gray-500"
    >
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
        Link="/login"
        onCLick={(e) =>
          signOut()
        }
      />
    </header>
  );
}

export default MobileSideBar;
