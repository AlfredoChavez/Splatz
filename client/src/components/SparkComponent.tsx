import {useState} from 'react';
import {Canvas} from '@react-three/fiber';
import './SparkComponent.css';
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

  //* Splats do not need the light component as it is "embedded" into them so we do not add it to the canvas
  return (
    <div className="splatContainer">
      {loading &&
      <Progress
        value={progress}
      />}

      <Canvas
        // https://threejs.org/docs/#PerspectiveCamera
        camera={{ position: [0, 0, 1], fov: 75, near: 0.01, far: 1000 }}
        // https://threejs.org/docs/#WebGLRenderer
        gl={{
          antialias: false,
          preserveDrawingBuffer: false,
          powerPreference: "high-performance"
        }}
      >
        <SplatScene
        splatURL = {splatURL}
        setLoading = {setLoading}
        setProgress = {setProgress}
        />
      </Canvas>
    </div>
  )
}

export default SparkComponent;