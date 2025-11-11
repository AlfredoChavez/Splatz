//! QE, RF and ZX could be potentially refactored into a single .tsx accepting the two elements as inputs.
import ZIcon from '@/assets/Instructions_Z.svg?react';
import XIcon from '@/assets/Instructions_X.svg?react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

function QE() {

  return (
    <>
      <div className='flex justify-center pointer-events-none'>
        <div className='pointer-events-none pr-5'>
          <Tooltip>
            <TooltipTrigger>
              <ZIcon
                className='w-16 h-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out z-20'
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Camera Roll Left</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className='pointer-events-none pl-5'>
          <Tooltip>
            <TooltipTrigger>
              <XIcon
                className='w-16 h-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out z-20'
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Camera Roll Right</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default QE;