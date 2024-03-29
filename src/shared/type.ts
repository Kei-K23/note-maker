import { NoteContent, NoteInfo } from './models'

export type GetNotesFiles = () => Promise<NoteInfo[]>
export type ReadNoteFile = (filename: NoteInfo['title']) => Promise<NoteContent>
export type WriteNoteFile = (filename: NoteInfo['title'], content: NoteContent) => Promise<void>
export type CreateNewNoteFile = () => Promise<NoteInfo['title'] | false>
export type DeleteNoteFile = (filename: NoteInfo['title']) => Promise<boolean>
export type UpdateNoteFilename = (
  oldFilename: NoteInfo['title'],
  newFilename: NoteInfo['title']
) => Promise<boolean>
