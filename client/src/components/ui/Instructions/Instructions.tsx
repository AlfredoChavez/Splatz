//* I am bringing the icons as react components from svg using the svg vite plugin. This provides me with better control over the elements
//! It is important to modify vite config and include TS declarations for the vite svg module
import MouseIcon from '@/../../resources/Instructions_Mouse.svg?react';
import WASDIcon from '@/../../resources/Instructions_WASD.svg?react';
import RF from './RF';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import GlassSurface from '@/components/GlassSurface';

function Instructions() {

  return (
    <>
      <div className='z-0'>
        <GlassSurface
          height={750}
          width={500}
          displace={5}
          distortionScale={50}
          redOffset={5}
          greenOffset={15}
          blueOffset={25}
          brightness={60}
          opacity={0.3}
          mixBlendMode="screen"
        >
          <div>
            <Tooltip>
              <TooltipTrigger>
                <MouseIcon
                  className='h-25 w-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out z-20'
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Move while clicked to orbit the scene</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div>
            <Tooltip>
              <TooltipTrigger>
                <WASDIcon
                  className='w-50 h-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out z-20'
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Navigate the scene</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div>
            <RF/>
          </div>
        </GlassSurface>
      </div>
    </>
  );
}

export default Instructions;