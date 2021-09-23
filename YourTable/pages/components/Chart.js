import React from 'react'
import {Line} from 'react-chartjs-2';

const data = {
    labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
    datasets: [
      {
        label: 'Reservations',
        fill: true,
        lineTension: 0.4,
        backgroundColor: 'rgba(245, 158, 11,0.4)',
        borderColor: 'rgba(245, 158, 11,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 0]
      }
    ]
  };
  

function Chart() {
    return (
      <div className=" bg-white min-w-screen shadow-sm border rounded-xl lg:m-20 border-gray-100">
        <div>
          <Line data={data} />
        </div>
  </div>
    )
}

export default Chart
