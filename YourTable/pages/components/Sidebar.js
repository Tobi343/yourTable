import React from 'react'
import SideBarCard from './SideBarCard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from '../../public/orange_logo.png'

function Sidebar() {
    return (
    <div id="sideBar" className="bg-yellow-500 text-blue-100 w-64 space-y-6 px-2 py-7 absolute md:min-h-screen inset-y-0 left-0 transform -translate-x-full md:sticky md:translate-x-0 transition duration-200 ease-in-out">    
        <a href="#" className="text-white flex items-center space-x-2 px-4">
           {/* <img className="w-8 h-8" src={Image}/>*/}
            <span className="text-2xl font-extrabold">YourTable</span> 
                </a>
                <nav className="">
                    <SideBarCard Link="/" Name="Dashboard" Icon={<DashboardIcon/>}/>
                    <SideBarCard Link="/Reservations" Name="Reservierungen" Icon={<DateRangeIcon/>}/>
                    <SideBarCard Link="#" Name="Mein Profil" Icon={<RestaurantIcon/>}/>
                    <SideBarCard Link="#" Name="Einstellungen" Icon={<SettingsIcon/>}/>
                    <SideBarCard Link="#" Name="Ausloggen"  Icon={<LogoutIcon/>}/>
                </nav>   
            </div>
    )
}

export default Sidebar
