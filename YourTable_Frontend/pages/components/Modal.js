import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Modal(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div
        className="w-full px-6 sm:w-1/2 xl:w-1/3"
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-center px-5 py-6 my-6 shadow-sm rounded-md bg-gray-200 hover:bg-gray-300">
          <div
            className={`p-3 rounded-full ${props.Color} bg-opacity-75 text-white`}
          >
            <SettingsIcon className="h-8 w-8" />
          </div>

          <div className="mx-5">
            <h4 className="text-2xl font-semibold text-gray-700">Ansicht</h4>
            <div className="text-gray-500">Was soll angezeigt werden?</div>
          </div>
        </div>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Ansicht / Was wollen Sie sehen ?
                  </h3>
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
                <div className="relative p-6 flex-auto h-44 overflow-y-auto">
                  {props.itemsProp.map((e,index) => (
                    <div class="flex items-center justify-between mb-5">
                      <div class="flex items-center">
                        <div class="pl-4 flex items-center">
                          <input
                            class="form-check-input appearance-none h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                            type="checkbox"
                            value="A"
                            id="flexCheckDefault"
                            checked={e.visible}
                            onChange={(e) => {
                              const newState = [...props.itemsProp];
                              newState[index].visible = e.target.checked;
                              props.setItemsProp(newState);
                            }}
                          />
                          <p
                            id="fb1"
                            tabindex="0"
                            class="focus:outline-none text-md leading-normal ml-2 text-gray-800"
                          >
                            {e.item}
                          </p>
                        </div>
                      </div>
                      <p
                        tabindex="0"
                        class="focus:outline-none w-8 text-xs leading-3 text-right text-indigo-700"
                      >
                        {e.number}
                      </p>
                    </div>
                  ))}
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
