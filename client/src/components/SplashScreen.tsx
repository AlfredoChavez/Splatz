import MetaBalls from './MetaBalls';
import SplatzLogo from '@/../../resources/Splatz_Logo.png';
import FileUpload from './FileUpload';
import DarkModeToggle from './DarkModeToggle';
import { FaGithub } from "react-icons/fa";


function SplashScreen () {

  return (
    <>
      <div className='w-full h-screen min-h-[600px] fixed z-20 flex flex-col items-center justify-between py-[10vh] pointer-events-none'>
        <img
        src={SplatzLogo}
        className='h-100 w-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out'
        alt='Splatz Logo'
      />

      <div className='fixed bottom-14 right-14 z-30 pointer-events-auto'>
        <DarkModeToggle />
      </div>

      <div className='pointer-events-auto shrink-0'>
        <FileUpload/>
      </div>

        <a
          href= 'https://github.com/AlfredoChavez/Splatz'
          className='pointer-events-auto shrink-0'
        >
          <div className='h-8 md:h-10 w-auto hover:scale-125 transition-transform duration-300'>
            <FaGithub size={50} className='stroke-10 stroke-gray-300 fill-[#dfeaeb] dark:fill-white dark:stroke-0'/>
          </div>
        </a>
      </div>

      <div className='w-full h-screen fixed inset-0 z-0 bg-white dark:bg-[rgb(43,41,40)]'>
        <MetaBalls
          color='#dfeaeb'
          cursorBallColor='#a6b1d7'
          cursorBallSize={1}
          ballCount={50}
          animationSize={20}
          enableMouseInteraction={true}
          enableTransparency={true}
          hoverSmoothness={0.05}
          clumpFactor={2}
          speed={0.3}
        />
      </div>
    </>
  );
}

export default SplashScreen;