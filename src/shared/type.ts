import { NoteContent, NoteInfo } from './models'

export type GetNotesFiles = () => Promise<NoteInfo[]>
export type ReadNoteFile = (filename: string) => Promise<NoteContent>
