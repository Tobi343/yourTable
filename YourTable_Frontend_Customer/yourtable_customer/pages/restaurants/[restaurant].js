import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Stepper } from "@progress/kendo-react-layout";
import { Calendar } from "@progress/kendo-react-dateinputs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GridLines from "react-gridlines";
import { Rnd } from "react-rnd";
import NavBar from "../components/navBar";
import { TimePicker } from "@progress/kendo-react-dateinputs";
import { DateTime } from "luxon";
import Router from "next/router";

export async function getServerSideProps(context) {
  /*const session =  await getSession(context)
  console.log("Session: "+session.accessToken)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }*/
  const res = await fetch(`http://34.139.40.48/restaurant`);
  const restaurants = await res.json();

  return {
    props: {
      restaurants,
    },
  };
}

async function editProfile(profile) {
  console.log(profile);
  const res = await fetch(`http://34.139.40.48/reservation`, {
    method: "POST",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      restaurant_id: profile.restaurant,
      customer_id: profile.customer,
      reservation_time: profile.time,
      reservation_date: profile.date,
      reservation_table: profile.table,
      reservation_extra: profile.extra,
      reservation_personCount: profile.count,
    }),
  });
  console.log("Finished!");
}
const items = [
  {
    label: "Personen",
    icon: "k-i-user",
  },
  {
    label: "Datum & Uhrzeit",
    icon: "k-i-calendar",
  },
  {
    label: "Tisch auwählen",
    icon: "k-i-layout",
  },
  {
    label: "Extras",
    icon: "k-i-plus",
    optional: true,
  },
  {
    label: "Abschließen",
    icon: "k-i-check",
  },
];

function restaurant({ restaurants }) {
  const router = useRouter();
  const id = router.query.restaurant;
  const date = new Date();
  const minTime = DateTime.local(2020, 10, 12, 12, 0, 0);
  const maxTime = DateTime.local(2020, 10, 12, 23, 0, 0);
  const steps = 30;

  const [people, setPeople] = useState(0);
  const [extraText, setExtraText] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState(0);
  const [selectedTable, setSelectedTable] = useState(0);
  const [selectedDate, setSelectedDate] = useState(date.toDateString());
  const [pickerVisible, setpickerVisible] = useState(false);
  const [checkVisible, setCheckVisible] = useState(false);
  const [makeReservation, setMakeReservation] = useState(false);
  const [table, setTable] = useState(
    JSON.parse(restaurants[id].restaurant_layout)
  );

  const handleChange = (e) => {
    setValue(e.value);
  };

  useEffect(() => {
    console.log(selectedTable);
    console.log(Math.abs(minTime.diff(maxTime).as("minutes")));
  }, []);

  return (
    <div className="flex-col h-full bg-gray-200">
      <NavBar className="" active={2}></NavBar>
      <div className="flex-1 h-full">
        <div class="bg-white block h-full mx-2 xl:mx-28 lg:mx-20 md:mx-14">
          <div class="">
            <div class="w-full bg-blue-500  h-56 rounded-t-lg">
              <img
                src={restaurants[id].restaurant_image}
                className="object-cover w-full h-56"
              />
            </div>
            <div class="absolute -mt-20 ml-5">
              <div class="bg-gray-200 border border-gray-300 h-36 w-36 rounded-lg shadow-md border-b border-primary">
                <label htmlFor="upload-button">
                  <img
                    src={restaurants[id].restaurant_logo}
                    className="object-cover h-36 w-36  rounded-lg"
                  />
                </label>
              </div>
            </div>
          </div>
          <input type="file" id="upload-button" style={{ display: "none" }} />

          <div class="bg-primary border border-primary rounded-b-lg p-5 pt-20 flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex flex-col mx-6 my-3 lg:col-span-2">
                <p className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Beschreibung
                </p>
                <p className=" py-2 px-3 text-gray-700 ">
                  {restaurants[id].details}
                </p>
              </div>
            </div>

            <div className="m-8 rounded-xl bg-gray-100 p-8">
              <Stepper
                value={value}
                onChange={handleChange}
                items={items}
                disabled={checkVisible}
              />
              <div>
                {value == 0 ? (
                  <div className="w-full h-full flex p-8 justify-center">
                    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 h-full ">
                      {Array(10)
                        .fill()
                        .map((v, i) => (
                          <div
                            className={`border-2  ${
                              people == i + 1 ? "border-orange-400" : ""
                            } flex justify-evenly items-center bg-white rounded-lg hover:bg-gray-200 text-center shadow-xs  dark:bg-gray-800 w-36 h-12`}
                            onClick={(e) => {
                              setPeople(i + 1);
                              setValue(1);
                            }}
                          >
                            <div className="flex ">
                              <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                {i + 1 == 10 ? i + 1 + "+" : i + 1}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : value == 1 ? (
                  <div>
                    <div
                      className={`bg-blue-300 w-full h-80 ${
                        pickerVisible ? "hidden" : ""
                      }`}
                    >
                      <Calendar
                        min={date}
                        onChange={(e) => {
                          setSelectedDate(e.value.toDateString());
                          console.log(e.value);
                          setpickerVisible(true);
                        }}
                        value={new Date(selectedDate)}
                        className="w-full h-80 "
                      />
                    </div>
                    <div
                      className={`w-full ${
                        pickerVisible ? "flex" : "hidden"
                      } p-8 justify-center h-80 overflow-scroll`}
                    >
                      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 h-full ">
                        <div
                          className={`border-2 flex justify-evenly items-center bg-white rounded-lg hover:bg-gray-200 text-center shadow-xs  dark:bg-gray-800 w-36 h-12`}
                          onClick={(e) => {
                            setpickerVisible(false);
                          }}
                        >
                          <div className="flex ">
                            <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                              {"Back"}
                            </p>
                          </div>
                        </div>

                        {Array(
                          Math.abs(minTime.diff(maxTime).as("minutes")) /
                            steps +
                            1
                        )
                          .fill()
                          .map((v, i) => (
                            <div
                              className={` ${
                                minTime
                                  .plus({ minutes: steps * i })
                                  .toLocaleString(DateTime.TIME_24_SIMPLE) ==
                                time
                                  ? "border-orange-400"
                                  : ""
                              } border-2 flex justify-evenly items-center bg-white rounded-lg hover:bg-gray-200 text-center shadow-xs  dark:bg-gray-800 w-36 h-12`}
                              onClick={(e) => {
                                setTime(
                                  minTime
                                    .plus({ minutes: steps * i })
                                    .toLocaleString(DateTime.TIME_24_SIMPLE)
                                );
                                setValue(2);
                                setpickerVisible(false);
                              }}
                            >
                              <div className="flex ">
                                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                  {minTime
                                    .plus({ minutes: steps * i })
                                    .toLocaleString(DateTime.TIME_24_SIMPLE)}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ) : value == 2 ? (
                  <div className="w-full h-96">
                    <GridLines
                      cellWidth={50}
                      strokeWidth={2}
                      className="  flex-1 h-full"
                    >
                      {table[0].map((e) => (
                        <Rnd
                          default={{
                            x: e.x,
                            y: e.y,
                            width: e.width,
                            height: e.height,
                          }}
                          dragGrid={[0, 0]}
                          resizeGrid={[0, 0]}
                          bounds={"parent"}
                          className={`${
                            selectedTable == e.key ? "border-gray-700" : ""
                          } border-2 rounded-lg bg-blue-500 hover:bg-blue-400`}
                          onClick={(ex) => {
                            setSelectedTable(e.key);
                            console.log(e.key);
                            console.log(selectedTable);
                            setValue(3);
                          }}
                        ></Rnd>
                      ))}
                    </GridLines>
                  </div>
                ) : value == 3 ? (
                  <div className="bg-red-300 w-full ">
                    <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div class="text-gray-600">
                          <p class="font-medium text-lg">Extra Angaben</p>
                          <p>Hier können sie extra wünsche angeben.</p>
                        </div>

                        <div class="md:col-span-2">
                          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                            <div class="md:col-span-5">
                              <label for="email">
                                Zusatz für die Reservierung
                              </label>
                              <textarea
                                rows="5"
                                name="nachricht"
                                id="nachricht"
                                class="w-full px-3 py-2 mt-1 placeholder-gray-300 border bg-gray-50 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 "
                                onChange={(e) => setExtraText(e.target.value)}
                                value={extraText}
                                placeholder="Eine spezielle Nachricht"
                              />
                            </div>
                            <div class="md:col-span-1">
                              <label for="email">Anzahl an Hunden</label>
                              <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                <button
                                  data-action="decrement"
                                  class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                >
                                  <span class="m-auto text-2xl font-thin">
                                    −
                                  </span>
                                </button>
                                <input
                                  type="number"
                                  class=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                  name="custom-input-number"
                                  value="0"
                                ></input>
                                <button
                                  data-action="increment"
                                  class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                >
                                  <span class="m-auto text-2xl font-thin">
                                    +
                                  </span>
                                </button>
                              </div>
                            </div>
                            <div class="md:col-span-2">
                              <label for="email">Anzahl an Hochstühlen</label>
                              <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                <button
                                  data-action="decrement"
                                  class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                >
                                  <span class="m-auto text-2xl font-thin">
                                    −
                                  </span>
                                </button>
                                <input
                                  type="number"
                                  class="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                  name="custom-input-number"
                                  value="0"
                                ></input>
                                <button
                                  data-action="increment"
                                  class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                >
                                  <span class="m-auto text-2xl font-thin">
                                    +
                                  </span>
                                </button>
                              </div>
                            </div>
                            <div class="md:col-span-2">
                              <label for="email">Geschätzter Aufenthalt</label>
                              <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                <button
                                  data-action="decrement"
                                  class=" bg-gray-50 text-gray-300 hover:text-gray-700 hover:bg-gray-50 h-full w-20 rounded-l cursor-pointer outline-none"
                                >
                                  <span class="m-auto text-2xl font-thin">
                                    −
                                  </span>
                                </button>
                                <input
                                  type="number"
                                  class=" focus:outline-none text-center w-full bg-gray-50 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                  name="custom-input-number"
                                  value="0"
                                ></input>
                                <button
                                  data-action="increment"
                                  class="bg-gray-50 text-gray-600 hover:text-gray-700 hover:bg-gray-50 h-full w-20 rounded-r cursor-pointer"
                                >
                                  <span class="m-auto text-2xl font-thin ">
                                    +
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="md:col-span-3 text-right">
                          <div class="inline-flex items-end">
                            <button
                              onClick={(e) => setValue(4)}
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Weiter
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {checkVisible ? (
                      <div className="">
                        <svg
                          className="h-96"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 130.2 130.2"
                        >
                          <circle
                            class="path circle"
                            fill="none"
                            stroke="#73AF55"
                            stroke-width="6"
                            stroke-miterlimit="10"
                            cx="65.1"
                            cy="65.1"
                            r="62.1"
                          />
                          <polyline
                            class="path check"
                            fill="none"
                            stroke="#73AF55"
                            stroke-width="6"
                            stroke-linecap="round"
                            stroke-miterlimit="10"
                            points="100.2,40.2 51.5,88.8 29.8,67.5 "
                          />
                        </svg>
                        <p>
                          Sieh dir deine Reservation unter den Tab
                          "Reservierungen" an. <br /> Möchtest du noch eine
                          Reservierung machen, dann klick{" "}
                          <span
                            onClick={(e) => Router.reload()}
                            className=" text-blue-500 hover:underline"
                          >
                            hier
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div className="bg-red-300 w-full ">
                        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div class="text-gray-600">
                              <p class="font-medium text-lg">Abschluss</p>
                              <p>
                                Bitte kontrolieren sie nocheinmal die Angaben
                                und hinterlassen sie ihre perönlichen Details.
                              </p>
                            </div>

                            <div class="lg:col-span-2">
                              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                <div class="md:col-span-5">
                                  <label for="full_name">Voller Name</label>
                                  <input
                                    type="text"
                                    name="full_name"
                                    id="full_name"
                                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </div>

                                <div class="md:col-span-5">
                                  <label for="email">Email Adress</label>
                                  <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@domain.com"
                                  />
                                </div>

                                <div class="md:col-span-1">
                                  <label for="address">Personen</label>
                                  <p
                                    name="address"
                                    id="address"
                                    class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                                  >
                                    {people}
                                  </p>
                                </div>

                                <div class="md:col-span-3">
                                  <label for="city">Datum</label>
                                  <p
                                    name="city"
                                    id="city"
                                    class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                                  >
                                    {selectedDate}
                                  </p>
                                </div>

                                <div class="md:col-span-1">
                                  <label for="zipcode">Tischnummer</label>
                                  <p
                                    name="zipcode"
                                    id="zipcode"
                                    class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                                  >
                                    {selectedTable}
                                  </p>
                                </div>

                                <div class="md:col-span-5 w-full">
                                  <div class="inline-flex items-center w-full">
                                    <p
                                      name="billing_same"
                                      id="billing_same"
                                      class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-gray-400"
                                    >
                                      {extraText}
                                    </p>
                                  </div>
                                </div>

                                <div class="md:col-span-5 text-right">
                                  <div class="inline-flex items-end">
                                    <button
                                      onClick={(e) => {
                                        setCheckVisible(true);
                                        /*editProfile({
                                        restaurant: restaurants[id].id,
                                        customer: 1,
                                        time: time,
                                        date: selectedDate,
                                        table: selectedTable,
                                        extra: extraText,
                                        count: people,
                                      });*/
                                      }}
                                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                      Reservieren
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <section class="text-gray-700">
                <div class="container px-5 py-24 mx-auto">
                  <div class="text-center mb-20">
                    <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
                      Häufig gestellte Fragen
                    </h1>
                    <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                      Fragen die von Kunden an das Restaurant gestellt wurden
                    </p>
                  </div>
                  <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                    <div class="w-full lg:w-1/2 px-4 py-2">
                      {Array(3)
                        .fill()
                        .map((v, i) => (
                          <details class="mb-4">
                            <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                              {"Frage " + i}
                            </summary>

                            <span>Antwort</span>
                          </details>
                        ))}
                    </div>
                    <div class="w-full lg:w-1/2 px-4 py-2">
                      {Array(3)
                        .fill()
                        .map((v, i) => (
                          <details class="mb-4">
                            <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4">
                              {"Frage " + i}
                            </summary>

                            <span class="px-4 py-2">Antwort</span>
                          </details>
                        ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <section class="text-gray-600 body-font overflow-hidden">
              <div class="container px-5 py-24 mx-auto">
                <div class="-my-8 divide-y-2 divide-gray-100">
                  {Array(3)
                    .fill()
                    .map((v, i) => (
                      <div class="py-8 flex flex-wrap md:flex-nowrap">
                        <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                          <span class="font-semibold title-font text-gray-700">
                            User ABC
                          </span>
                          <span class="mt-1 text-gray-500 text-sm">
                            14 Jun 2022
                          </span>
                        </div>
                        <div class="md:flex-grow">
                          <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                            Sehr gutes Restaurant
                          </h2>
                          <p class="leading-relaxed">
                            Das Klima war sehr schön und die Ausstatung ist auch
                            sehr nobel. Ich habe auf YourTable nach einem guten
                            Restaurant gesucht und dann habe ich dieses schöne
                            Gefunden. Wirklich TOP. und YourTable ist auch
                            richtig nice
                          </p>
                        
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default restaurant;
