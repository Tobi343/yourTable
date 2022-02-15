import React from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Sidebars/Navbar";
import MobileSideBar from "./components/Sidebars/MobileSideBar";
import Sidebar from "./components/Sidebars/Sidebar";
import { useState, useEffect, useRef } from "react";
const QrReader = dynamic(() => import("react-qr-reader"), {
  ssr: false,
});

function qrCodeScanner() {
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [NavColor, setNavColor] = useState("bg-blue-500");

  function handleScan(data) {
    console.log(data);
    if (data != undefined && !showModal) {
      setShowModal(true);
      console.log(data)
      setResult(data);
    }
  }
  function handleError(err) {
    console.error(err);
  }
  return (
    <div>
      <Navbar setNavColorField={setNavColor} />
      <main className="flex bg-gray-100 overflow-y-hidden">
        <Sidebar NavColorField={NavColor} />
        <div className="w-full flex flex-col h-full">
          <MobileSideBar />
          <div className="h-screen pt-8 bg-blue-500 md:bg-gray-200">
            <div className="p-4 mx-4  rounded-xl bg-white text-center">
              <span className="w-full text-center  font-semibold text-2xl py-8 text-gray-600">
                Scan a Reservation
              </span>
              <QrReader
                className=""
                delay={300}
                onScan={handleScan}
                onError={handleError}
              />
            </div>

            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">Reservation</h3>
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
                      <div className="relative p-6 flex-auto">
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          {result}
                        </p>
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default qrCodeScanner;
