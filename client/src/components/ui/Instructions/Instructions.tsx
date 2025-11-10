//* I am bringing the icons as react components from svg using the svg vite plugin. This provides me with better control over the elements
//! It is important to modify vite config and include TS declarations for the vite svg module
import MouseIcon from '@/../../resources/Instructions_Mouse.svg?react';
import WASDIcon from '@/../../resources/Instructions_WASD.svg?react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

function Instructions() {

  return (
    <>
      <div>
        <Tooltip>
          <TooltipTrigger>
            <MouseIcon
              className='h-25 w-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out'
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
              className='w-50 h-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out'
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Navigate the scene</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
}

export default Instructions;