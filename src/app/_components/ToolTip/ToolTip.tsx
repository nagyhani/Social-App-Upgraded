
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import React from 'react'

export default function ToolTip() {
  return (
    <div>

         <Tooltip>
      <TooltipTrigger asChild>
         <i className="fa-solid fa-question text-gray-400 text-xs cursor-pointer"></i>
      </TooltipTrigger>
      <TooltipContent>
        <p>Providing your birthday helps make sure that you get the right experience for your age. If you want to change who sees this, go to the About section of your profile.</p>
      </TooltipContent>
    </Tooltip>
    </div>
  )
}
