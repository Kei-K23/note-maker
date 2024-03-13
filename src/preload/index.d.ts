import { ElectronAPI } from '@electron-toolkit/preload'
import { GetNotesFiles } from '@shared/type'

declare global {
  interface Window {
    context: {
      getNotesFiles: GetNotesFiles
    }
  }
}
