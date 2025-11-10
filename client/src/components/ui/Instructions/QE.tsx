//! QE, RF and ZX could be potentially refactored into a single .tsx accepting the two elements as inputs.
import QIcon from '@/../../resources/Instructions_Q.svg?react';
import EIcon from '@/../../resources/Instructions_E.svg?react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

function QE() {

  return (
    <>
      <div className='flex justify-center pointer-events-none'>
        <div className='pointer-events-none pr-10'>
          <Tooltip>
            <TooltipTrigger>
              <QIcon
                className='w-16 h-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out z-20'
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Camera Pedestal Down</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className='pointer-events-none pl-10'>
          <Tooltip>
            <TooltipTrigger>
              <EIcon
                className='w-16 h-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out z-20'
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Camera Pedestdal Up</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default QE;