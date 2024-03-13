import { NotePreview } from './NotePreview'
import { ComponentProps, useState } from 'react'
import { cn } from '@renderer/utils/cn'
import { useNotesList } from '@renderer/hooks'
import { isEmpty } from 'lodash'

type NotePreviewListProps = ComponentProps<'ul'> & { resetScroll: () => void }

export const NotePreviewList = ({ resetScroll, className, ...props }: NotePreviewListProps) => {
  const [isEdited, setIsEdited] = useState<string | null>(null)
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
    <ul className={cn('space-y-3', className)} {...props}>
      {notes.map((note, index) => (
        <NotePreview
          isActive={selectedNoteIndex === index}
          onClick={() => {
            handleSelection(index)
          }}
          onDoubleClick={() => setIsEdited(note.title)}
          setIsEdited={setIsEdited}
          key={index}
          isEdited={isEdited}
          {...note}
        />
      ))}
    </ul>
  )
}
