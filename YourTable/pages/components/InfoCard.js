import React from 'react'

function InfoCard(props) {
    return (
        <div className="rounde bg-gray-100 p-5 flex flex-col shadow-md w-full sm:w-80 md:w-64 h-60 my-6 mx-1 overflow-hidden" >

                <h2 class="text-center px-2 pb-5">{props.title}</h2>  

        </div>
    )
}

export default InfoCard
