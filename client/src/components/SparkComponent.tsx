import {useEffect, useRef} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {SplatMesh, FpsMovement, PointerControls} from '@sparkjsdev/spark';
// import * as THREE from 'three';

//* TS forces me to create an interface to indicate which type of prop i am consuming
interface splatUrlProp {
  splatURL : string;
};

function SplatScene ({splatURL}: splatUrlProp) {
  const splatRef = useRef(null);
  const {camera, gl, scene} = useThree();
  //* In TS I have to make sure to type things properly as it does not allow me to simply add a null to a type that is not supposed to be null.
  const fpsMovementRef = useRef <FpsMovement | null> (null);
  const pointerControlsRef = useRef <PointerControls | null> (null);

  useEffect(()=>{
    fpsMovementRef.current = new FpsMovement();
    const canvas = gl.domElement;
    pointerControlsRef.current = new PointerControls({canvas});
  }, [gl]);

  return null;
}

function SparkComponent({splatURL}: splatUrlProp) {

  return (
    <>
      <Canvas>
        <SplatScene splatURL={splatURL}/>
      </Canvas>
    </>
  )
}

export default SparkComponent;
