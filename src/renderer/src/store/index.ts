import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { NoteContent, NoteInfo } from '@shared/models'

const loadNotesFiles = async () => {
  const notes = await window.context.getNotesFiles()

  return notes.sort((a, b) => b.lastEdited - a.lastEdited)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotesFiles())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex === null || !notes) return null

  const note = notes[selectedNoteIndex]

  const noteContent = await window.context.readNoteFile(note.title)

  return {
    ...note,
    content: noteContent
  }
})

export const selectedNote = unwrap(
  selectedNoteAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEdited: new Date().getTime()
    }
)

export const createNewNote = atom(null, (get, set) => {
  const notes = get(notesAtom)

  if (!notes) return null

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

  if (selectedNoteValue === null || !notes) return null

  set(
    notesAtom,
    notes.filter((note) => note.title !== selectedNoteValue.title)
  )

  set(selectedNoteIndexAtom, null)
})

export const saveNote = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom)
  const selectedNoteValue = get(selectedNote)

  if (selectedNoteValue === null || !notes) return null

  await window.context.writeNoteFile(selectedNoteValue.title, newContent)

  set(
    notesAtom,
    notes.map((note) =>
      note.title === selectedNoteValue.title
        ? {
            ...note,
            content: newContent,
            lastEdited: new Date().getTime()
          }
        : note
    )
  )
})
