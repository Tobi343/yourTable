import Head from "next/head";
import React from "react";
import { useState } from "react";
import CardContainer from "./components/Cards/CardContainer";
import Sidebar from "./components/Sidebars/Sidebar";
import MobileSideBar from "./components/Sidebars/MobileSideBar";
import Navbar from "./components/Sidebars/Navbar";
import { useSession, signIn, signOut,getSession } from "next-auth/react"

export async function getServerSideProps(context) {
 const session =  await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session: session   }
  
  }
}

export default function Home({session}) {

  const [NavColor,setNavColor] = useState("bg-blue-500" );
  //const { data: session, status } = useSession()

  //console.log("Session: "+session)
  //if(session)
    //console.log("Success");
  //else
    //console.log("No Success")

  return (
    <div>
      <Head>
        <title>YourTableAdminPanel</title>
        <link rel="icon" href="/orange_logo.png" />
      </Head>
      <div>
        <Navbar setNavColorField={setNavColor} session={session} />
        <main className="flex bg-gray-100">
          <Sidebar NavColorField={NavColor}/>
          <div className="w-full flex flex-col h-screen overflow-y-hidden">
            <MobileSideBar />
            <CardContainer  Color={NavColor}/>
          </div>
        </main>
      </div>
    </div>
  );
}
