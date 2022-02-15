import React from "react";
import QRCode from "react-qr-code";

export default function Modal(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div
        className="w-4 mr-2 transform hover:fill-purple-500 hover:scale-110"
        onClick={(e) => {
          setShowModal(true);
        }}
      >
        <img src={"/qr-code.png"} />
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto max-w-6xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">QR-Code</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className=" flex-auto justify-center px-20">
                  <QRCode
                    value={`Name ${props.reser.customer_firstname} ${
                      props.reser.customer_secondname
                    } \nDatum ${
                      props.reser.reservation_date.split("T")[0]
                    } \nUhrzeit ${props.reser.reservation_time} \nRestaurant ${
                      props.reser.restaurant_name
                    } \nPersonen ${props.reser.reservation_personcount} \nRaum ${
                      props.reser.reservation_room
                    } \nTisch ${props.reser.reservation_table} \n(${
                      props.reser.restaurant_id
                    },${props.reser.customer_id})
                    `}
                    className="w-full"
                  />
                  ,
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
