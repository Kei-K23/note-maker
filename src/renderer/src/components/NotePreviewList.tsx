import { NotePreview } from './NotePreview'
import { ComponentProps } from 'react'
import { cn } from '@renderer/utils/cn'
import { useNotesList } from '@renderer/hooks'
import { isEmpty } from 'lodash'

type NotePreviewListProps = ComponentProps<'ul'> & { resetScroll: () => void }

export const NotePreviewList = ({ resetScroll, className, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleSelection } = useNotesList({ onSelect: resetScroll })

  if (!notes) return null

  if (isEmpty(notes)) {
    return (
      <ul className={cn('text-center', className)} {...props}>
        <span>No notes yet!</span>
      </ul>
    )
  }

  return (
    <ul className={cn(className)} {...props}>
      {notes.map((note, index) => (
        <NotePreview
          isActive={selectedNoteIndex === index}
          onClick={() => handleSelection(index)}
          key={index}
          {...note}
        />
      ))}
    </ul>
  )
}
