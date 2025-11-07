import {useState} from 'react';
import {Canvas} from '@react-three/fiber';
import { Progress } from '@/components/ui/progress';
import SplatScene from './SplatScene';

//* TS forces me to create an interface to indicate which type of prop I am consuming
type SparkProps = {
  splatURL : string;
};

function SparkComponent({splatURL}: SparkProps) {
  //* I need to keep track of the loading progress with these states
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  //TODO Handle file errors on load and redirect back to the SplashScreen on error
  //* Splats do not need the light component as it is "embedded" into them so we do not add it to the canvas
  return (
    <div className='flex-1 h-full bg-[rgb(43,41,40)] overflow-hidden relative'>
      {loading &&
        <div className="absolute inset-0 flex items-center justify-center">
          <div className='flex flex-col'>
            <p className="text-[#dfeaeb] text-center text-4xl font-extrabold text-balance m-2.5">
              {progress} %
            </p>
            <div className="w-[50vw] max-w-[600px]">
              <Progress value={progress} />
            </div>
          </div>
        </div>
      }

      <Canvas
        // https://threejs.org/docs/#PerspectiveCamera
        camera={{ position: [0, 0, 1], fov: 75, near: 0.01, far: 1000 }}
        // https://threejs.org/docs/#WebGLRenderer
        gl={{
          antialias: false,
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance'
        }}
      >
        <SplatScene
        splatURL = {splatURL}
        setLoading = {setLoading}
        setProgress = {setProgress}
        />
      </Canvas>
    </div>
  );
}

export default SparkComponent;