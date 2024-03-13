import { selectedNote } from '@renderer/store'
import { cn } from '@renderer/utils/cn'
import { useAtomValue } from 'jotai'
import { ComponentProps } from 'react'

export const FloatingNoteTitle = ({ className, ...props }: ComponentProps<'div'>) => {
  const note = useAtomValue(selectedNote)

  if (!note) return null

  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <span className="text-gray-300">{note.title}</span>
    </div>
  )
}
