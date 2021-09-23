import React from 'react'
import InfoCard from './InfoCard'

function CardContainer() {
    return (
       <div className="">
            <div className="flex flex-wrap justify-evenly">
                <InfoCard title="Reservierungen"/> 
                <InfoCard title="Kunden"/>
                <InfoCard title="Freie Tische"/>
                <InfoCard title="Ansichten"/>
            </div>
       </div>
    )
}

export default CardContainer 
