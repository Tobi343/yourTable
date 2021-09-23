import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';


function SideBarCard(props) {
    return (
        <a href={props.Link} className="block py-2.5 my-3 px-4 rounded transition duration-200 hover:bg-gray-100 hover:text-yellow-500">
            {props.Icon}{" "}{props.Name}
        </a>
    )
}

export default SideBarCard
