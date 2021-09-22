import Head from 'next/head'
import MobileSideBar from './components/MobileSideBar';
import Sidebar from './components/Sidebar'
import CardContainer from './components/CardContainer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>YourTableAdminPanel</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div class="relative min-h-screen md:flex">
        <MobileSideBar/>
        <Sidebar/>
        <div className="flex-1 p-10 text-2xl  min-h-screen font-bold">
          <CardContainer/>
        </div>
      </div>


    </div>
  )
}
