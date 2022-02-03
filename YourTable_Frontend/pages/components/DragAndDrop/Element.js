import React from "react";
import { Rnd } from "react-rnd";
import { Popover } from "@headlessui/react";
import { height, width } from "@mui/system";
import { PortraitSharp } from "@mui/icons-material";

function Element(props) {
  return (
    <Rnd
      default={{
        x: props.x,
        y: props.y,
        width: props.width,
        height: props.height,
      }}

     
      dragGrid={[props.size, props.size]}
      resizeGrid={[props.size, props.size]}
      bounds={"parent"}
      onDoubleClick={(e) => {
        var index = props.tables[props.roomNumber].findIndex(
          (x) => x.key == props.keyProp
        );
        
        let copy = [...props.tables];
        copy[props.roomNumber].splice(index,1);
        props.setTables(copy);
        console.log(index)
        console.log(copy)
      }}
      onDragStop={(e, d) => {
        var index = props.tables[props.roomNumber].findIndex(
          (x) => x.key == props.keyProp
        );

        let g = props.tables[props.roomNumber][index];

        g = {
          key: props.keyProp,
          x:
            d.x -
            (d.x % props.size > props.size / 2
              ? -(props.size - (d.x % 50))
              : d.x % props.size),
          y:
            d.y -
            (d.y % props.size > props.size / 2
              ? -(props.size - (d.y % 50))
              : d.y % props.size),
          width: props.width,
          height: props.height,
        };

        let copy = [...props.tables];
        copy[props.roomNumber][index] = g;
        props.setTables(copy);


      }}
      
      onResizeStop={(e, direction, ref, delta, position)=>{
        var index = props.tables[props.roomNumber].findIndex(
          (x) => x.key == props.keyProp
        );

        let g = props.tables[props.roomNumber][index];
        g = {
          key: props.keyProp,
          x: position.x,
          y: position.y,
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        };

        let copy = [...props.tables];
        copy[props.roomNumber][index] = g;
        props.setTables(copy);

      }}
      className=" rounded-lg bg-blue-500"
    >
      <Popover className="relative">
        <Popover.Button></Popover.Button>

        <Popover.Panel className="absolute z-10 w-64 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative  bg-white p-7 ">
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  Tischnummer: 3A
                </p>
              </div>

              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  Uhrzeit: 13:40
                </p>
              </div>

              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  Datum: 12.10.2021
                </p>
              </div>

              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  Anzahl: 15 Personen
                </p>
              </div>
            </div>
            <div className="p-4 bg-gray-50">
              <a
                href="#"
                className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
              >
                <span className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 ">
                    Jetzt mit dem Kunden chatten
                  </span>
                </span>
              </a>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </Rnd>
  );
}

export default Element;
