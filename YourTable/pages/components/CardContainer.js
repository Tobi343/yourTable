import React from 'react'
import InfoCard from './InfoCard'

function CardContainer() {
    return (
       <div className="">
            <div className="flex flex-wrap justify-evenly">
                <InfoCard title="Reservations"/> 
                <InfoCard title="Customers"/>
                <InfoCard title="Free Tables"/>
                <InfoCard title="Views"/>
            </div>
       </div>
    )
}

export default CardContainer 
