import { notesAtom, selectedNoteIndexAtom } from '@renderer/store'
import { useAtom, useAtomValue } from 'jotai'
import { NoteInfo } from '@shared/models'

export const useNotesList = ({
  onSelect
}: {
  onSelect?: () => void
}): {
  notes: NoteInfo[] | undefined
  selectedNoteIndex: number | null
  handleSelection: (index: number) => void
} => {
  const notes = useAtomValue(notesAtom)

  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  const handleSelection = (index: number) => {
    setSelectedNoteIndex(index)
    if (onSelect) onSelect()
  }

  return {
    notes,
    selectedNoteIndex,
    handleSelection
  }
}
