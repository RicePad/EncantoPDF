import Image from 'next/image';
import  './globals.css'
import LandingPage from '@/components/LandingPage';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
     <Navbar />
     <div className="mainContainer">
      <LandingPage />
     </div>
    </>
      
  )
}
