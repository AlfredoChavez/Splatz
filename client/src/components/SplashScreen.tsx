import GlassSurface from "./GlassSurface";
// import Iridescence from "./Iridescence";
// import { useEffect, useState } from "react";
import SplatzLogo from '@/../../resources/Splatz_Logo.png';

function SplashScreen () {

  // function getWindowDimensions() {
  //   const { innerWidth: width} = window;
  //   return width;
  // }
  // const [windowWidth, setWindowWidth] = useState(getWindowDimensions());
  // useEffect(()=>{

  //   function handleResize() {
  //     setWindowWidth(getWindowDimensions());
  //   }
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);

  // }, []);

  return (
    <>
      <div className='w-full fixed'>
        <div className='flex items-center justify-center h-screen'>
          <GlassSurface
            width={200}
            height={200}
            opacity={100}
            backgroundOpacity={0.7}
            borderRadius={100}
            className="my-custom-class"
          >
            <img src = {SplatzLogo} className="h-50 w-auto"></img>
          </GlassSurface>
        </div>
      </div>

      {/* <div className='w-full h-full overflow-hidden'>
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={true}
          amplitude={0.5}
          speed={0.5}
        />
      </div> */}
    </>
  )
}

export default SplashScreen;