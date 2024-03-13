import { cn } from '@renderer/utils/cn'
import React, { ComponentProps } from 'react'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <span className="text-gray-300">New Title</span>
    </div>
  )
}
