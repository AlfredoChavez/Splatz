//! QE, RF and ZX could be potentially refactored into a single .tsx accepting the two elements as inputs.
import RIcon from '@/../../resources/Instructions_R.svg?react';
import FIcon from '@/../../resources/Instructions_F.svg?react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

function RF() {

  return (
    <>
      <div className='flex flex-col justify-center pointer-events-none'>
        <div className='pointer-events-none'>
          <Tooltip>
            <TooltipTrigger>
              <RIcon
                className='w-16 h-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out z-20'
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Camera Tilt Up</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className='pointer-events-none'>
          <Tooltip>
            <TooltipTrigger>
              <FIcon
                className='w-16 h-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out z-20'
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Camera Tilt Down</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default RF;