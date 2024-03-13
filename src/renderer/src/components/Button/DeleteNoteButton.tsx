import React from 'react'
import { ActionButton, ActionButtonProps } from './ActionButton'
import { Trash2Icon } from 'lucide-react'
import { useSetAtom } from 'jotai'
import { deleteNote } from '@renderer/store'
import { toast } from 'react-toastify'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const onDeleteClick = useSetAtom(deleteNote)

  const handleDeleteClick = async () => {
    const isDeleted = await onDeleteClick()
    if (isDeleted) {
      toast.success('Note deleted successfully', {
        position: 'bottom-right'
      })
    }
  }

  return (
    <ActionButton {...props} onClick={handleDeleteClick}>
      <Trash2Icon className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
