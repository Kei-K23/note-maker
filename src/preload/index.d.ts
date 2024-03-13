import { ElectronAPI } from '@electron-toolkit/preload'
import { GetNotesFiles, ReadNoteFile } from '@shared/type'

declare global {
  interface Window {
    context: {
      getNotesFiles: GetNotesFiles
      readNoteFile: ReadNoteFile
    }
  }
}
