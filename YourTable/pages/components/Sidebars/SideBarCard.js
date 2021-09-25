import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from "@mui/icons-material/Dashboard";


function SideBarCard(props) {
    return (
        <a href="#" class="flex items-center active-nav-link text-white py-4 pl-6 transition duration-200 nav-item hover:bg-gray-100 hover:text-blue-500">
        <DashboardIcon/> Dashboard
        </a>
    )
}

export default SideBarCard
