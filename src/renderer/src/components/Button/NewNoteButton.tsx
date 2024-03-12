import React from 'react'
import { ActionButton, ActionButtonProps } from './ActionButton'
import { PenIcon } from 'lucide-react'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <PenIcon className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
