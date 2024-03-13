import { cn } from '@renderer/utils/cn'
import { dateFormatter } from '@renderer/utils/dateFormatter'
import { ComponentProps } from 'react'
import { NoteInfo } from '@shared/models'

import { UpdatePreview } from './UpdatePreview'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
  isEdited?: string | null
  setIsEdited: React.Dispatch<React.SetStateAction<string | null>>
} & ComponentProps<'li'>

export const NotePreview = ({
  className,
  title,
  lastEdited,
  isEdited,
  setIsEdited,
  isActive = false,
  ...props
}: NotePreviewProps) => {
  const date = dateFormatter(lastEdited)

  if (isEdited === title) {
    return <UpdatePreview title={title} setIsEdited={setIsEdited} />
  }

  return (
    <li
      className={cn(
        'cursor-pointer px-3 py-2 rounded-md transition-colors duration-100 last:mb-14 ',
        isActive && 'bg-zinc-500/50',
        !isActive && 'hover:bg-zinc-600/50'
      )}
      {...props}
    >
      <h3 className="mb-1 font-bold truncate">{title}</h3>
      <span className="inline-block w-full mb-2 text-xs font-light ">{date}</span>
    </li>
  )
}
