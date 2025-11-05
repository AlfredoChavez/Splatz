import {useEffect, useRef} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {SplatMesh, FpsMovement, PointerControls} from '@sparkjsdev/spark';
import './SparkComponent.css';

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
    //https://sparkjs.dev/docs/splat-mesh/
    let mounted = true;
    //* We load the splat with this IIFE function
    (async () => {
      try {
        const response = await fetch(splatURL);
        if(!mounted) return;

        const arrayBuffer = await response.arrayBuffer();
        if(!mounted) return;

        const fileBytes = new Uint8Array(arrayBuffer);
        const fileName = splatURL.split('/').pop();

        const splat = new SplatMesh({
          fileBytes,
          fileName
        });
        //* Rotate the splat to the correct orientation
        splat.quaternion.set(1, 0, 0, 0);

        if(!mounted) {
          try {
            splat.dispose();
          } catch (error) {
            console.error('🚨 Error loading the Splat:', error);
            return;
          };
        };

        scene.add(splat);
        splatRef.current = splat;

        //TODO Check if we can trigger this loaded check, it gives some errors related to the Spark and TS types.
        //TODO This will probably be important if we want to add some reveal effect to the splat when loading? https://sparkjs.dev/examples/#splat-reveal-effects
        //! await splat.loaded;

        if (!mounted) {
          scene.remove(splat);
          try {
            splat.dispose();
          } catch (error) {
            console.error('🚨 Error loading the Splat:', error);
          };
          splatRef.current = null;
        }

      } catch (error) {
        console.error('🚨 Error loading the Splat:', error);
      };
    })();

    return () => {
      mounted = false;
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
  //TODO Customise the controls with specific keyboard inputs
  const fpsMovementRef = useRef <FpsMovement | null> (null);
  const pointerControlsRef = useRef <PointerControls | null> (null);

  //* If we have a renderer, we have to set up the controls
  useEffect(()=>{
    //TODO Implement that controls only work when the mouse is over the specific instance of the SparkComponent (in case we have multiple SparkComponents)
    fpsMovementRef.current = new FpsMovement();
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