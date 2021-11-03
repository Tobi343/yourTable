import React from "react";
import { Rnd } from "react-rnd";
import { Popover } from "@headlessui/react";

function Element(props) {
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      }}
      dragGrid={[props.size, props.size]}
      resizeGrid={[props.size, props.size]}
      bounds={"parent"}
      className="bg-blue-300"
    >
      <Popover className="relative">
        <Popover.Button>
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M63 4094 c-13 -3 -32 -17 -43 -31 -20 -26 -20 -36 -20 -1504 l0
-1478 23 -26 c17 -21 32 -27 62 -27 30 0 45 6 62 27 l23 26 0 570 0 569 510 0
510 0 0 -547 c0 -356 4 -561 11 -586 8 -30 18 -42 45 -53 29 -12 39 -12 68 0
28 12 37 23 46 55 16 60 9 1423 -8 1472 -16 48 -75 115 -126 142 -40 21 -52
22 -378 25 l-338 3 -2 592 c-3 657 0 624 -71 697 -54 56 -106 73 -237 76 -63
1 -125 0 -137 -2z m255 -199 l22 -26 0 -570 0 -569 -85 0 -85 0 0 593 c0 327
3 597 8 601 4 5 32 6 62 3 43 -5 60 -12 78 -32z m846 -1356 c23 -18 26 -27 26
-85 l0 -64 -510 0 -510 0 0 85 0 85 484 0 c474 0 484 0 510 -21z"
              />
              <path
                d="M4813 4090 c-55 -12 -93 -32 -131 -71 -70 -72 -67 -40 -70 -696 l-2
-592 -338 -3 c-326 -3 -338 -4 -378 -25 -51 -27 -110 -94 -126 -142 -17 -49
-24 -1412 -8 -1472 9 -32 18 -43 46 -55 29 -12 39 -12 68 0 27 11 37 23 45 53
7 25 11 230 11 586 l0 547 510 0 510 0 0 -569 0 -570 23 -26 c32 -38 92 -38
124 0 l23 26 0 1479 0 1479 -24 28 c-23 27 -27 28 -132 30 -60 1 -128 -2 -151
-7z m135 -762 l2 -598 -85 0 -85 0 0 569 c0 555 0 569 20 594 22 28 45 35 105
33 l40 -1 3 -597z m2 -853 l0 -85 -510 0 -510 0 0 64 c0 58 3 67 26 85 26 21
36 21 510 21 l484 0 0 -85z"
              />
              <path
                d="M1305 3555 c-24 -23 -25 -28 -25 -179 0 -182 15 -239 81 -304 76 -77
74 -77 442 -80 l327 -3 0 -44 c0 -124 50 -221 139 -267 44 -23 66 -28 127 -28
l74 0 0 -554 0 -554 -152 -4 c-175 -5 -234 -23 -289 -86 -49 -55 -61 -96 -66
-217 -7 -140 2 -174 47 -197 32 -16 80 -18 550 -18 470 0 518 2 550 18 45 23
54 57 47 197 -5 121 -17 162 -66 217 -55 63 -114 81 -288 86 l-153 4 0 554 0
554 74 0 c61 0 83 5 127 28 89 46 139 143 139 267 l0 45 318 0 c311 0 318 1
367 24 59 27 107 72 138 130 20 37 22 59 25 213 l4 172 -26 26 -25 25 -1231 0
-1231 0 -24 -25z m2363 -241 c-3 -94 -4 -96 -36 -125 l-32 -29 -1041 0 c-1147
0 -1075 -4 -1098 62 -6 17 -11 66 -11 109 l0 79 1111 0 1111 0 -4 -96z m-850
-348 c7 -35 -9 -107 -29 -127 -18 -18 -35 -19 -225 -19 -119 0 -213 4 -224 10
-29 16 -54 132 -33 154 4 3 119 5 257 4 236 -3 251 -4 254 -22z m105 -1607
c46 -12 70 -57 65 -122 l-3 -42 -425 0 -425 0 -3 42 c-5 61 19 110 60 122 47
13 683 14 731 0z"
              />
            </g>
          </svg>
        </Popover.Button>

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
