import RIcon from '@/../../resources/Instructions_R.svg?react';
import FIcon from '@/../../resources/Instructions_F.svg?react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

function RF() {

  return (
    <>
      <div>
        <div>
          <Tooltip>
            <TooltipTrigger>
              <RIcon
                className='w-16 h-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out z-20'
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Camera Pitch Up</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div>
          <Tooltip>
            <TooltipTrigger>
              <FIcon
                className='w-16 h-auto transition-transform duration-300 shrink-0 pointer-events-auto hover:animate-scale-in-out z-20'
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Camera Pitch Down</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default RF;