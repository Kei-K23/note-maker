import { NoteInfo } from './models'

export type GetNotesFiles = () => Promise<NoteInfo[]>
