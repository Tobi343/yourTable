import React from 'react'

function InfoCard(props) {
    return (
        <div className="bg-gray-100 flex flex-col shadow-md h-40" >
            <div  className={`${props.color} h-14 text-white flex flex-wrap content-center items-center justify-center`}>
                <h2 class="text-center ">{props.title}</h2>
            </div>
            <div className="flex flex-col m-5">
                <span className="text-4xl text-gray-700">{props.count}</span>
                <span className=" text-gray-500 opacity-70 text-base">{props.info}</span>
            </div>

        </div>
    )
}

export default InfoCard
