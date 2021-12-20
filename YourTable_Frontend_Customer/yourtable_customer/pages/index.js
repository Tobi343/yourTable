import NavBar from "./components/navBar";
import Card from "./components/card";

export default function Home() {
  return (
    <div className="flex-col h-full bg-gray-100">
      <NavBar className=""></NavBar>
      <div className="flex-1 bg-background-Image flex opacity-80 bg-cover h-screen"></div>
      <div className="flex-1 flex flex-col h-full">
        <div className="w-full flex justify-center">
          <span className=" text-black">In 4 einfachen Schritten</span>
        </div>
        <div className="grid grid-cols-1 place-content-around lg:grid-cols-2 2xl:grid-cols-4  mx-20">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}
