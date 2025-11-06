import {useEffect, useRef} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {SplatMesh, FpsMovement, PointerControls, SplatLoader} from '@sparkjsdev/spark';
import './SparkComponent.css';
import * as THREE from 'three';

//* TS forces me to create an interface to indicate which type of prop I am consuming
interface splatUrlProp {
  splatURL : string;
};

function SplatScene ({splatURL}: splatUrlProp) {

  //* I need a reference to the splat so I keep the splat constant between frames
  const splatRef = useRef <SplatMesh | null> (null);

  //* I need to build my scene using my camera, renderer and the actual scene.
  const {camera, gl, scene} = useThree();

  useEffect(() =>{
    // https://sparkjs.dev/docs/loading-splats/
    //https://sparkjs.dev/docs/splat-mesh/
    //* We load the splat with this IIFE function
    (async () => {
      try {
        const loader = new SplatLoader();
        loader.loadAsync(splatURL, (event) => {
          if (event.type === "progress") {
            const progress = event.lengthComputable
              ? `${((event.loaded / event.total) * 100).toFixed(2)}%`
              : `${event.loaded} bytes`;
            console.log(`Background download progress: ${progress}`);
          }
        })
        .then((packedSplats) => {
          const splatMesh = new SplatMesh({packedSplats});
          splatMesh.quaternion.set(1, 0, 0, 0);
          scene.add(splatMesh);
        })
        .catch((error:Error) => {
          console.error(error);
        });
      } catch (error) {
        console.error('🚨 Error mounting the Splat:', error);
      };
    })();

    return () => {
      if (splatRef.current) {
        scene.remove(splatRef.current);
        if(splatRef.current.dispose) {
          splatRef.current.dispose();
        }
        splatRef.current = null;
      }
    };
  }, [splatURL, scene]);

  //* In TS I have to make sure to type things properly as it does not allow me to simply add a null to a type that is not supposed to be null.
  const fpsMovementRef = useRef <FpsMovement | null> (null);
  const pointerControlsRef = useRef <PointerControls | null> (null);

  //* If we have a renderer, we have to set up the controls
  useEffect(()=>{
    //* Customise the controls with specific keyboard inputs
    // https://sparkjs.dev/docs/controls/
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    const movementMapping = {
      'KeyQ' : new THREE.Vector3(0,-1,0),
      'KeyE' : new THREE.Vector3(0,1,0),
      'KeyW' : new THREE.Vector3(0,0,-1),
      'KeyA' : new THREE.Vector3(-1,0,0),
      'KeyS' : new THREE.Vector3(0,0,1),
      'KeyD' : new THREE.Vector3(1,0,0),
    };

    const rotateMapping = {
      'KeyZ' : new THREE.Vector3(0,0,1),
      'KeyX' : new THREE.Vector3(0,0,-1),
      'KeyR' : new THREE.Vector3(0,-1,0),
      'KeyF' : new THREE.Vector3(0,1,0),
    }

    //TODO Implement that controls only work when the mouse is over the specific instance of the SparkComponent (in case we have multiple SparkComponents)
    fpsMovementRef.current = new FpsMovement({keycodeMoveMapping:movementMapping, keycodeRotateMapping:rotateMapping});
    const canvas = gl.domElement;
    pointerControlsRef.current = new PointerControls({canvas});
  }, [gl]);

  //* Manage what happens in every frame
  //* The first argument is the state but we can neatly avoid the TS issue by using the "_" placeholder for unnused variable
  useFrame((_, delta) => {
    if(fpsMovementRef.current) fpsMovementRef.current.update(delta, camera);
    if(pointerControlsRef.current) pointerControlsRef.current.update(delta, camera);
  });

  //* return is needed for the .jsx <SplatScene>
  return null;
}

function SparkComponent({splatURL}: splatUrlProp) {
  //* Splats do not need the light component as it is "embedded" into them so we do not add it to the canvas
  return (
    <div className="splatContainer">
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
        <SplatScene splatURL={splatURL}/>
      </Canvas>
    </div>
  )
}

export default SparkComponent;