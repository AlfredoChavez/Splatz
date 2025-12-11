import MetaBalls from './ui/MetaBalls/MetaBalls';
import SplatzLogo from '@/assets/Splatz_Logo.png';
import FileUpload from './FileUpload';
import { FaGithub } from 'react-icons/fa';
import DarkModeToggle from './ui/DarkModeToggle';
import { useState, useRef, useEffect } from 'react';

function SplashScreen() {

  const [isDark, setIsDark] = useState(false);
  const [toggleTop, setToggleTop] = useState('72px'); // default bottom-18 equivalent
  const githubRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTogglePosition = () => {
      if (githubRef.current) {
        const rect = githubRef.current.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        setToggleTop(`${centerY}px`);
      }
    };

    updateTogglePosition();
    window.addEventListener('resize', updateTogglePosition);

    return () => window.removeEventListener('resize', updateTogglePosition);
  }, []);

  return (
    <>
      <div className='w-full h-dvh min-h-[600px] fixed z-20 flex flex-col items-center justify-between pt-[10vh] pb-[10dvh] pointer-events-none'>
        <img
          src={SplatzLogo}
          className='h-100 w-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out'
          alt='Splatz Logo'
        />

        <div
          className='fixed right-14 z-30 pointer-events-auto -translate-y-1/2'
          style={{ top: toggleTop }}
        >
          <DarkModeToggle
            scale={1}
            isDark = {isDark}
            setIsDark={setIsDark}
          />
        </div>

        <div className='pointer-events-auto shrink-0'>
          <FileUpload/>
        </div>

        <a
          href= 'https://github.com/AlfredoChavez/Splatz'
          className='pointer-events-auto shrink-0'
        >
          <div
            ref={githubRef}
            className='h-full w-auto hover:scale-125 transition-transform duration-300'
          >
            <FaGithub size={50} className='stroke-10 stroke-gray-300 fill-[#dfeaeb] dark:fill-white dark:stroke-0'/>
          </div>
        </a>
      </div>

      <div className='w-full h-screen fixed inset-0 z-0 bg-white dark:bg-[rgb(43,41,40)]'>
        <MetaBalls
          color={isDark && '#dfeaeb' || '#444444'}
          cursorBallColor= {isDark && '#a6b1d7' || '#666666'}
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