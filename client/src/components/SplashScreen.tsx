import MetaBalls from './MetaBalls';
import SplatzLogo from '@/../../resources/Splatz_Logo.png';
import GitHubIcon from '@/../../resources/github.svg';
import FileUpload from './FileUpload';

function SplashScreen () {

  return (
    <>
      <div className='w-full h-screen fixed z-20 flex flex-col items-center justify-between py-[10vh] pointer-events-none'>
        <img
          src={SplatzLogo}
          className='h-100 w-auto pointer-events-none'
          alt='Splatz Logo'
        />

        <div className='pointer-events-auto'>
          <FileUpload/>
        </div>

        <a
          href= 'https://github.com/AlfredoChavez/Splatz'
          className='pointer-events-auto'
        >
          <img
            src={GitHubIcon}
            alt='GitHub Logo'
            className='h-10 w-auto invert'
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