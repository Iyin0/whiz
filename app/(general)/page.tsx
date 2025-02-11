import Image from 'next/image';
import Newsletter from '@/components/layout/newsletter';
import GetInvolved from '@/components/layout/get-involved';
import Faqs from '@/components/layout/faqs';
import Link from 'next/link';

export default function Home() {

  return (
    <div className="">
      <div className="h-screen w-full bg-cover bg-center bg-[url('/images/HeroImage.png')]">
        <div className="h-full w-full gap-8 px-4 sm:px-10 lg:px-20 flex flex-col justify-center bg-gradient-to-r from-black/80 to-black/60 sm:to-transparent">
          <h1 className="text-white text-4xl sm:text-5xl lg:text-[64px] font-bold max-w-[728px] leading-[60px] sm:leading-[75px]">Empowering Rural Communities Through Digital Literacy</h1>
          <div className="flex gap-4">
            <Link 
              href="/contact#volunteer"
              className="text-white border-white border border-border bg-transparent py-2 px-5 rounded-md text-sm"            >
              Join Us
            </Link>
            <Link 
              href="/contact#donate"
              className="text-white border-primary border bg-primary py-2 px-5 rounded-md text-sm"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center py-10 px-4 sm:px-10 lg:px-20">
        <div className="flex flex-col gap-4 max-w-[641px]">
          <h2 className="text-3xl font-bold pb-2.5 pr-10 border-b border-secondary w-fit">Mission Statement</h2>
          <p className="text-lg">
            Bridging the digital and technological gap between rural and urban communities by enlightening, educating and empowering rural communities with digital and technical knowledge and skills.
          </p>
        </div>
        <Image src="/images/MissionLogo.png" alt="Mission Statement" loading="lazy" width={497} height={331} className="hidden sm:block" />
      </div>
      <div className="bg-cover bg-center bg-[url('/images/EnlightenImage.png')]">
        <div className="bg-[#00403A] opacity-85 w-full h-full py-20 sm:py-20 px-4 sm:px-10 lg:px-20 flex justify-center items-center">
          <div className="flex flex-col items-center justify-center gap-10 max-w-[1187px] text-white">
            <h2 className="flex flex-col text-5xl font-black h-[1em] overflow-hidden text-center">
              <span className="animate-slide-up">ENLIGHTEN</span>
              <span className="animate-slide-up">EDUCATE</span>
              <span className="animate-slide-up">EMPOWER</span>
              <span className="animate-slide-up">ENLIGHTEN</span>
            </h2>
            <p className="text-xl text-center max-w-[750px]">
              Over 300 students from 15 schools in Offa, Kwara State, have participated in our Digital Literacy Workshop, equipping them with essential technology knowledge and skills for the future.
            </p>
            <Link
              href="/projects"
              className="text-white border-secondary border bg-transparent hover:bg-secondary hover:text-white py-2 px-5 rounded-md text-sm"
            >
              Our Programs
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-center pb-11 pt-24 sm:pt-44 px-4">
        <div className="flex justify-between gap-10">
        <Image src="/images/JoinImage.png" alt="Enlighten" loading="lazy" width={706} height={468} className="rounded-[50px] hidden sm:block" />
        <div className="flex flex-col max-w-[515px]">
          <h2 className="text-2xl font-bold pb-2 pr-10 border-b border-secondary w-fit">Join Us and Make A Difference</h2>
          <p className="text-lg text-primary italic font-semibold py-4">Be a catalyst for change!</p>
          <p className="text-base">Are you passionate about education and technology? Do you want to help rural communities in Nigeria gain essential digital skills? Join Whiz Academy as a volunteer!</p>
          <p className="text-base italic font-medium mt-2 mb-8">impactful work, hands-on experience, community impact.</p>
          <div className="flex justify-center sm:justify-start">
            <Link
              href="/contact#volunteer"
              className="border-black border-2 bg-transparent rounded-lg w-fit py-1.5 px-3 text-sm"
            >
              Join Us
            </Link>
          </div>
        </div>
        </div>
      </div>
      <Newsletter />
      <Faqs />
      <GetInvolved />
    </div>
  );
}
