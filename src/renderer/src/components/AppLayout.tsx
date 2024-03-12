import { cn } from '@renderer/utils/cn'
import { ComponentProps, forwardRef } from 'react'

export const Root = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={cn('flex h-screen text-slate-200', className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside className={cn('w-[250px] mt-10 h-screen overflow-auto', className)} {...props}>
      {children}
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 overflow-auto', className)} {...props}>
      {children}
    </div>
  )
)

Content.displayName = 'Content'
