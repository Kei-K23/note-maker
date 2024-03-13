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

export const createNewNote = atom(null, (get, set) => {
  const notes = get(notesAtom)

  const newNote: NoteInfo = {
    title: `New note ${notes.length + 1}`,
    lastEdited: new Date().getTime()
  }

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

  set(selectedNoteIndexAtom, 0)
})

export const deleteNote = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const selectedNoteValue = get(selectedNote)
  if (selectedNoteValue === null) return null

  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNoteValue.title)
  )

  set(selectedNoteIndexAtom, null)
})
