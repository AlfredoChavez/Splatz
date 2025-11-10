import {useState, useEffect} from 'react';
import {Canvas} from '@react-three/fiber';
import { Progress } from './ui/Progress';
import { useLocation } from 'react-router';
import SplatScene_Reveal from './SplatScene_Reveal';
import Dock from './ui/Dock';
import { FaHome, FaKeyboard } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Instructions from './ui/Instructions/Instructions';

function SparkComponent() {
  //* I need to keep track of the loading progress with these states
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [splatURL, setSplatURL] = useState('');

  const location = useLocation();
  const fileURL = location.state.file.url;

  useEffect(()=>{
    setSplatURL(fileURL);
  }, [fileURL]);

  const navigate = useNavigate();

  const items = [
    { icon: <FaHome className='fill-white' size={18} />, label: 'Home', onClick: () => navigate('/') },
    //TODO Add Controls Button that displays Keyboard and Mouse controls (use GlassSurface as Background?)
    { icon: <FaKeyboard className='fill-white' size={18} />, label: 'Controls', onClick: () => alert('Controls') },
  ];

  //* Splats do not need the light component as it is 'embedded' into them so we do not add it to the canvas
  return (
    <>
      <div className='flex-1 h-full bg-[rgb(43,41,40)] overflow-hidden relative'>
        {loading &&
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='flex flex-col'>
              <p className='text-[#dfeaeb] text-center text-4xl font-extrabold text-balance m-2.5'>
                {Math.round(progress)} %
              </p>
              <div className='w-[50vw] max-w-[600px]'>
                <Progress value={progress} />
              </div>
            </div>
          </div>
        }
        {!loading &&
          <>
            <div className='absolute inset-0 z-40 flex items-center justify-center'>
              <Instructions></Instructions>
            </div>
            <div className='absolute inset-x-0 bottom-0 z-50 flex items-center justify-center'>
              <Dock
                items={items}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
              />
            </div>
          </>
        }
        <Canvas
          // https://threejs.org/docs/#PerspectiveCamera
          camera={{ position: [0, 0, 1], fov: 75, near: 0.01, far: 1000 }}
          // https://threejs.org/docs/#WebGLRenderer
          gl={{
            antialias: false,
            preserveDrawingBuffer: false,
            powerPreference: 'high-performance',
          }}
        >
          <SplatScene_Reveal
            splatURL = {splatURL}
            setLoading = {setLoading}
            setProgress = {setProgress}
          />
        </Canvas>
      </div>
    </>
  );
}

export default SparkComponent;