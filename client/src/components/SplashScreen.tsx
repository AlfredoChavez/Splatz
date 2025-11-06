import MetaBalls from './MetaBalls';
import SplatzLogo from '@/../../resources/Splatz_Logo.png';
import GitHubIcon from '@/../../resources/github.svg';
import FileUpload from './FileUpload';

function SplashScreen () {

  return (
    <>
      <div className='w-full h-screen min-h-[600px] fixed z-20 flex flex-col items-center justify-between py-[10vh] pointer-events-none'>
        <img
        src={SplatzLogo}
        className='h-100 w-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out'
        // className='h-100 w-auto pointer-events-none shrink-0'
        alt='Splatz Logo'
      />

      <div className='pointer-events-auto shrink-0'>
        <FileUpload/>
      </div>

        <a
          href= 'https://github.com/AlfredoChavez/Splatz'
          className='pointer-events-auto shrink-0'
        >
          <img
            src={GitHubIcon}
            alt='GitHub Logo'
            className='h-8 md:h-10 w-auto invert hover:scale-125 transition-transform duration-300'
          />
        </a>
      </div>

      <div className='w-full h-screen fixed inset-0 z-0 bg-[rgb(43,41,40)]'>
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