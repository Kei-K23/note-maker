import { cn } from '@renderer/utils/cn'
import React, { ComponentProps } from 'react'

export const ActionButton = ({ className, children, ...props }: ComponentProps<'button'>) => {
  return (
    <button
      className={cn(
        'py-2 px-3 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
