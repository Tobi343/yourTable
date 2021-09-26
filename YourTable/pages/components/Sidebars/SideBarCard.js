import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';


function SideBarCard(props) {
    return (
        <a href={`${props.Link}`} className="flex items-center active-nav-link text-white py-4 pl-6 transition duration-200 nav-item hover:bg-gray-100 hover:text-blue-500">
        {props.Icon} {props.Text}
        </a>
    )
}

export default SideBarCard
