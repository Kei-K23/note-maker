import { atom } from 'jotai'
import { noteMockData } from './mock'
import { NoteInfo } from 'src/renderer/shared/models'

export const notesAtom = atom<NoteInfo[]>(noteMockData)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const selectedNote = atom((get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex === null) return null

  return {
    ...notes[selectedNoteIndex],
    content: `content for note ${selectedNoteIndex}`
  }
})
