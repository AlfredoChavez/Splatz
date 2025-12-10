import {useEffect, useRef, useState, useMemo} from 'react';
import {useFrame, useThree} from '@react-three/fiber';
import {SplatMesh, FpsMovement, PointerControls, SplatLoader, dyno} from '@sparkjsdev/spark';
import * as THREE from 'three';
import { useNavigate } from 'react-router';

//* TS forces me to create an interface to indicate which type of prop I am consuming
type SplatSceneProps = {
  splatURL: string
  setProgress: React.Dispatch<React.SetStateAction<number>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setSplatCenter: React.Dispatch<React.SetStateAction<{ x: number; y: number; z: number }>>
  joystickRef?: { current: { x: number; y: number } }
  joystickLookRef?: { current: { x: number; y: number } }
};

function SplatScene_Reveal({splatURL, setLoading, setProgress, setSplatCenter, joystickRef, joystickLookRef}: SplatSceneProps) {

  //* I need a reference to the splat so I keep the splat constant between frames
  const splatRef = useRef <SplatMesh | null> (null);

  //* I need to build my scene using my camera, renderer and the actual scene
  const {camera, gl, scene} = useThree();

  const [splatLoaded, setSplatLoaded] = useState(false);
  const animateT = useRef(dyno.dynoFloat(0));
  const baseTime = useRef(0);

  //* Setup magic effect shader with some help from the example https://sparkjs.dev/examples/#splat-reveal-effects and AI
  const setupMagicEffect = (splatMesh: SplatMesh) => {
    try {
      splatMesh.objectModifier = dyno.dynoBlock(
        { gsplat: dyno.Gsplat },
        { gsplat: dyno.Gsplat },
        ({ gsplat }) => {
          const d = new dyno.Dyno({
            inTypes: { gsplat: dyno.Gsplat, t: 'float' },
            outTypes: { gsplat: dyno.Gsplat },
            globals: () => [
              dyno.unindent(`
                vec3 hash(vec3 p) {
                  p = fract(p * 0.3183099 + 0.1);
                  p *= 17.0;
                  return fract(vec3(p.x * p.y * p.z, p.x + p.y * p.z, p.x * p.y + p.z));
                }

                vec3 noise(vec3 p) {
                  vec3 i = floor(p);
                  vec3 f = fract(p);
                  f = f * f * (3.0 - 2.0 * f);
                  vec3 n000 = hash(i + vec3(0,0,0));
                  vec3 n100 = hash(i + vec3(1,0,0));
                  vec3 n010 = hash(i + vec3(0,1,0));
                  vec3 n110 = hash(i + vec3(1,1,0));
                  vec3 n001 = hash(i + vec3(0,0,1));
                  vec3 n101 = hash(i + vec3(1,0,1));
                  vec3 n011 = hash(i + vec3(0,1,1));
                  vec3 n111 = hash(i + vec3(1,1,1));
                  vec3 x0 = mix(n000, n100, f.x);
                  vec3 x1 = mix(n010, n110, f.x);
                  vec3 x2 = mix(n001, n101, f.x);
                  vec3 x3 = mix(n011, n111, f.x);
                  vec3 y0 = mix(x0, x1, f.y);
                  vec3 y1 = mix(x2, x3, f.y);
                  return mix(y0, y1, f.z);
                }
              `),
            ],
            statements: ({ inputs, outputs }) => dyno.unindentLines(`
              ${outputs.gsplat} = ${inputs.gsplat};
              float t = ${inputs.t};
              float s = smoothstep(0.,10.,t-4.5)*10.;
              vec3 scales = ${inputs.gsplat}.scales;
              vec3 localPos = ${inputs.gsplat}.center;
              float l = length(localPos.xz);

              float border = abs(s-l-.5);
              localPos *= 1.-.2*exp(-20.*border);
              vec3 finalScales = mix(scales,vec3(0.002),smoothstep(s-.5,s,l+.5));
              ${outputs.gsplat}.center = localPos + .1*noise(localPos.xyz*2.+t*.5)*smoothstep(s-.5,s,l+.5);
              ${outputs.gsplat}.scales = finalScales;
              float at = atan(localPos.x,localPos.z)/3.1416;
              ${outputs.gsplat}.rgba *= step(at,t-3.1416);
              ${outputs.gsplat}.rgba += exp(-20.*border) + exp(-50.*abs(t-at-3.1416))*.5;
            `),
          });

          gsplat = d.apply({ gsplat, t: animateT.current }).gsplat;
          return { gsplat };
        },
      );

      splatMesh.updateGenerator();
    } catch (err) {
      console.error('Failed to setup magic effect 🪄:', err);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    //https://sparkjs.dev/docs/loading-splats/
    //https://sparkjs.dev/docs/splat-mesh/
    //* We load the splat with this IIFE function
    (async () => {
      try {
        setLoading(true);
        const loader = new SplatLoader();
        const packedSplats = await loader.loadAsync(splatURL, (event) => {
          if (event.type === 'progress' && event.lengthComputable) {
            const percent = Number((event.loaded / event.total) * 100);
            setProgress(percent);
            // console.log(percent);
          }
        });

        const splatMesh = new SplatMesh({ packedSplats });
        splatMesh.quaternion.set(1, 0, 0, 0);
        scene.add(splatMesh);
        splatRef.current = splatMesh;

        //* Calculate splat bounding box center
        const bbox = splatMesh.getBoundingBox(true);
        const center = bbox.getCenter(new THREE.Vector3());
        setSplatCenter(center);
        //! Only log this in development
        // console.log('Splat center 🎯:', center);

        setSplatLoaded(true);
        baseTime.current = 0;
        setupMagicEffect(splatMesh);

      } catch (error) {
        console.error('🚨 Error mounting the Splat:', error);
        //* The second argument passing replace:true does not allow the user to go back the previous page using the Back button.
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
        setProgress(0);
        URL.revokeObjectURL(splatURL);
        //! Only log this in development
        // console.log(`Revoked temporary URL: ${splatURL} 🗑️`);
      }
    })();

    return () => {
      if (splatRef.current) {
        scene.remove(splatRef.current);
        if (splatRef.current.dispose) {
          splatRef.current.dispose();
        }
        splatRef.current = null;
      }
      setSplatLoaded(false);
    };
  }, [splatURL, scene, setLoading, setProgress, navigate, setSplatCenter]);

  //* In TS I have to make sure to type things properly as it does not allow me to simply add a null to a type that is not supposed to be null
  const fpsMovementRef = useRef <FpsMovement | null> (null);
  const pointerControlsRef = useRef <PointerControls | null> (null);

  // Touch control logic
  const isTouchDevice = useMemo(() => 'ontouchstart' in window || navigator.maxTouchPoints > 0, []);

  // Touch Look Logic inside the scene

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
    };

    fpsMovementRef.current = new FpsMovement({keycodeMoveMapping:movementMapping, keycodeRotateMapping:rotateMapping});
    const canvas = gl.domElement;
    pointerControlsRef.current = new PointerControls({canvas});
  }, [gl]);

  //* Manage what happens in every frame
  //* The first argument is the state but we can neatly avoid the TS issue by using the '_' placeholder for unnused variable
  useFrame((_, delta) => {
    if(fpsMovementRef.current) fpsMovementRef.current.update(delta, camera);
    if(pointerControlsRef.current) pointerControlsRef.current.update(delta, camera);

    // Apply Joystick Movement from ref
    if (isTouchDevice && joystickRef && (joystickRef.current.x !== 0 || joystickRef.current.y !== 0)) {
      const speed = 5.0 * delta; // Adjust speed as necessary
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

      // Flatten vectors to XZ plane for "walking" behavior
      forward.y = 0;
      forward.normalize();
      right.y = 0;
      right.normalize();

      const moveZ = joystickRef.current.y; // Negative when up (from joystick)
      const moveX = joystickRef.current.x; // Positive when right

      // Move forward magnitude based on joystick Y (inverted logic: Up(neg) -> Forward)
      camera.position.addScaledVector(forward, -moveZ * speed);

      // Move right magnitude based on joystick X
      camera.position.addScaledVector(right, moveX * speed);
    }

    // Apply Joystick Look from ref
    if (isTouchDevice && joystickLookRef && (joystickLookRef.current.x !== 0 || joystickLookRef.current.y !== 0)) {
      const lookSpeed = 2.0 * delta; // Adjust sensitivity

      // Yaw (left/right) - Rotate around world Y
      // joystick x > 0 means stick right -> camera turn right -> rot y negative
      camera.rotation.y -= joystickLookRef.current.x * lookSpeed;

      // Pitch (up/down)
      // joystick y > 0 means stick down -> camera look down -> rot x negative
      // joystick y < 0 means stick up -> camera look up -> rot x positive
      // Stick down (positive y) -> should look down -> subtract.
      camera.rotation.x -= joystickLookRef.current.y * lookSpeed;

      // Clamp pitch to avoid flipping
      camera.rotation.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, camera.rotation.x));
    }

    if(splatLoaded && splatRef.current) {
      baseTime.current += delta;
      animateT.current.value = baseTime.current;
      splatRef.current.updateVersion();
    }

  });

  //* return is needed for the .jsx
  return null;
}

export default SplatScene_Reveal;