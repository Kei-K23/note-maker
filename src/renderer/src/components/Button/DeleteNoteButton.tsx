import React from 'react'
import { ActionButton, ActionButtonProps } from './ActionButton'
import { Trash2Icon } from 'lucide-react'
import { useSetAtom } from 'jotai'
import { deleteNote } from '@renderer/store'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const onDeleteClick = useSetAtom(deleteNote)

  return (
    <ActionButton {...props} onClick={onDeleteClick}>
      <Trash2Icon className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
