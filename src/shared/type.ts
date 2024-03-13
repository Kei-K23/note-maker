import { NoteContent, NoteInfo } from './models'

export type GetNotesFiles = () => Promise<NoteInfo[]>
export type ReadNoteFile = (filename: NoteInfo['title']) => Promise<NoteContent>
export type WriteNoteFile = (filename: NoteInfo['title'], content: NoteContent) => Promise<void>
