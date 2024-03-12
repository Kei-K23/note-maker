import { noteMockData } from '@renderer/store/mock'
import { NotePreview } from './NotePreview'
import { ComponentProps } from 'react'
import { cn } from '@renderer/utils/cn'

export const NotePreviewList = ({ className, ...props }: ComponentProps<'ul'>) => {
  if (noteMockData.length <= 0) {
    return (
      <ul className={cn('text-center', className)} {...props}>
        <span>No notes yet!</span>
      </ul>
    )
  }

  return (
    <ul className={cn(className)} {...props}>
      {noteMockData.map((note, index) => (
        <NotePreview key={index} {...note} />
      ))}
    </ul>
  )
}
