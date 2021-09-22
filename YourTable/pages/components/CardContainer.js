import React from 'react'
import InfoCard from './InfoCard'

function CardContainer() {
    return (
        <div className=" p-4 space-x-3 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
            <InfoCard/>
            <InfoCard/>
            <InfoCard/>
            <InfoCard/>
        </div>
    )
}

export default CardContainer 
