import { ActionButton, ActionButtonProps } from './ActionButton'
import { PenIcon } from 'lucide-react'
import { createNewNote } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { toast } from 'react-toastify'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const onCreateClick = useSetAtom(createNewNote)

  const handleCreateClick = async () => {
    const isCreated = await onCreateClick()
    if (isCreated) {
      toast.success('Note created successfully', {
        position: 'bottom-right'
      })
    }
  }

  return (
    <ActionButton {...props} onClick={handleCreateClick}>
      <PenIcon className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
