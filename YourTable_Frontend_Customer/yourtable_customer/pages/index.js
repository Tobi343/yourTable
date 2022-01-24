import NavBar from "./components/navBar";
import Card from "./components/card";
import { useState, useEffect } from "react";
import TextTransition, { presets } from "react-text-transition";

const TEXTS = [
  "Burger",
  "Wok",
  "Steak",
  "Fisch",
  "Pizza",
  "Griechisch",
  "Schnitzel",
  "Pommes",
  "Nudeln"
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => Math.round(Math.random()*TEXTS.length)),
      2000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className="flex-col h-full bg-gray-600">
      <NavBar className="" active={1}></NavBar>
      <div className="flex-1 flex h-screen">
        <section class="relative flex-1 flex bg-blueGray-50">
          <div class="relative pt-16 pb-32 flex flex-1  content-center items-center justify-center ">
            <div class="absolute top-0 w-full h-full bg-center bg-background-Image bg-cover">
              <span
                id="blackOverlay"
                class="w-full h-full absolute opacity-75 bg-black"
              ></span>
            </div>
            <div class="container relative mx-auto">
              <div class="items-center flex flex-wrap">
                <div class="w-full lg:w-6/12 px-4 ml-20 mr-auto">
                  <div class="pr-12">
                    <h1 class="text-white font-semibold text-5xl">
                      Hast du Lust auf{" "}
                      <TextTransition
                      inline="true"
                        text={TEXTS[index % TEXTS.length]}
                        springConfig={presets.wobbly}
                        className=" underline"

                      />
                       {" ?"}
                    </h1>
                    <p class="text-gray-300 text-lg mt-5 pr-36">
                      Egal auf was du Lust hast. Wir bringen dich zu einem
                      Tisch, in dem Restaurant deiner Wahl.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex-1 flex flex-col h-full ">
        <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6] p-32">
          <div class="container">
            <div class="flex flex-wrap -mx-4">
              <Card image="2829247.jpg" text="Restaurant auswählen" />
              <Card image="5462318.jpg" text="Anzahl und Uhrzeit angeben" />
              <Card image="6247588.jpg" text="Tisch auswählen" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
