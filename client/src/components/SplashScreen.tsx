// import GlassSurface from "./GlassSurface";
import Iridescence from "./Iridescence";

function SplashScreen () {

  return (
      <div className='w-full h-full overflow-hidden'>
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
      </div>
  )
}

export default SplashScreen;