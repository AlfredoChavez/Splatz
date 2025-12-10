import {useState, useEffect, useRef, useMemo} from 'react';
import {Canvas} from '@react-three/fiber';
import { Progress } from './ui/Progress';
import { useLocation } from 'react-router';
import SplatScene_Reveal from './SplatScene_Reveal';
import Dock from './ui/Dock';
import { FaHome, FaKeyboard } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Instructions from './ui/Instructions/Instructions';
import Joystick from './Joystick';

function SparkComponent() {
  //* I need to keep track of the loading progress with these states
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [splatURL, setSplatURL] = useState('');
  const [displayInstruction, setDisplayInstructions] = useState(false);
  const [splatCenter, setSplatCenter] = useState({ x: 0, y: 0, z: 0 });

  const location = useLocation();
  const navigate = useNavigate();

  //* Create a ref for joystick movement to pass down to the scene
  const joystickRef = useRef({ x: 0, y: 0 });
  const joystickLookRef = useRef({ x: 0, y: 0 });
  const isTouchDevice = useMemo(() => 'ontouchstart' in window || navigator.maxTouchPoints > 0, []);

  const handleJoystickMove = (pos: { x: number; y: number }) => {
    joystickRef.current = pos;
  };

  const handleJoystickLook = (pos: { x: number; y: number }) => {
    joystickLookRef.current = pos;
  };

  //* Redirect to splash screen if no file data is available (e.g., direct navigation or page reload)
  useEffect(() => {
    if (!location.state?.file?.url) {
      navigate('/', { replace: true });
      return;
    }
  }, [location.state, navigate]);

  //* Only set splatURL if file data exists
  useEffect(() => {
    if (location.state?.file?.url) {
      setSplatURL(location.state.file.url);
    }
  }, [location.state]);

  //* Handle Escape key to close instructions
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDisplayInstructions(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  //* Don't render if no file data is available (redirect will happen)
  if (!location.state?.file?.url) {
    return null;
  }

  const items = [
    { icon: <FaHome className='fill-white' size={18} />, label: 'Home', onClick: () => navigate('/', { replace: true }) },
    ...(!isTouchDevice ? [{ icon: <FaKeyboard className='fill-white' size={18} />, label: 'Controls', onClick: () => setDisplayInstructions(!displayInstruction) }] : []),
  ];

  //* Splats do not need the light component as it is 'embedded' into them so we do not add it to the canvas
  return (
    <>
      <div className='flex-1 h-dvh bg-[rgb(43,41,40)] overflow-hidden relative pb-safe'>
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
            {displayInstruction &&
            <div className='absolute inset-0 z-40 flex items-center justify-center pointer-events-none'>
              <div className='origin-center transition-transform duration-300 scale-[min(1,calc(100vw/550))] -translate-y-14'>
                <Instructions></Instructions>
              </div>
            </div>
            }
            <div className='absolute inset-x-0 bottom-4 z-50 flex items-center justify-center pb-safe'>
              <Dock
                items={items}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
              />
            </div>
            <div className='fixed bottom-14 right-14 z-30 pointer-events-auto pb-safe pr-safe hidden md:block'>
              <p className='text-white text-sm'>
                <span className='font-bold'>Alfredo Chavez</span>, 2025
              </p>
            </div>
            {isTouchDevice &&
              <>
                <Joystick onMove={handleJoystickMove} className="bottom-28 left-8" />
                <Joystick onMove={handleJoystickLook} className="bottom-28 right-8" />
              </>
            }
          </>
        }
        <Canvas
          // https://threejs.org/docs/#PerspectiveCamera
          camera={{ position: [splatCenter.x, splatCenter.y, splatCenter.z], fov: 75, near: 0.01, far: 1000 }}
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
            setSplatCenter={setSplatCenter}
            joystickRef={joystickRef}
            joystickLookRef={joystickLookRef}
          />
        </Canvas>
      </div>
    </>
  );
}

export default SparkComponent;