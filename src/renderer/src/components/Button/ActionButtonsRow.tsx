import React, { ComponentProps } from 'react'
import { NewNoteButton } from './NewNoteButton'
import { DeleteNoteButton } from './DeleteNoteButton'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
