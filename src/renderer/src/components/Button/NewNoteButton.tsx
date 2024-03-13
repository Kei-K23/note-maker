import { ActionButton, ActionButtonProps } from './ActionButton'
import { PenIcon } from 'lucide-react'
import { createNewNote } from '@renderer/store'
import { useSetAtom } from 'jotai'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const onCreateClick = useSetAtom(createNewNote)

  return (
    <ActionButton {...props} onClick={async () => await onCreateClick()}>
      <PenIcon className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
