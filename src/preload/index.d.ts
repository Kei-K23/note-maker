import { ElectronAPI } from '@electron-toolkit/preload'
import {
  CreateNewNoteFile,
  DeleteNoteFile,
  GetNotesFiles,
  ReadNoteFile,
  UpdateNoteFilename,
  WriteNoteFile
} from '@shared/type'

declare global {
  interface Window {
    context: {
      locale: string
      getNotesFiles: GetNotesFiles
      readNoteFile: ReadNoteFile
      writeNoteFile: WriteNoteFile
      createNewNoteFile: CreateNewNoteFile
      deleteNoteFile: DeleteNoteFile
      updateNoteFilename: UpdateNoteFilename
    }
  }
}
