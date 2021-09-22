import React from 'react'

function InfoCard(props) {
    return (
        <div className="bg-blue-300 rounded p-5 flex flex-col shadow-md w-full sm:w-80 h-60 my-6 mx-1 overflow-hidden" >

                <h2 class="text-center px-2 pb-5">{props.title}</h2>  

            <a href="#" class="bg-blue-500 text-white p-3 text-center hover:bg-blue-800 transition-all duration-500">Know More</a>
        </div>
    )
}

export default InfoCard
