import { GetNotesFiles, ReadNoteFile } from '@shared/type'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolated must be set to true')
}

try {
  contextBridge.exposeInMainWorld('context', {
    getNotesFiles: (...args: Parameters<GetNotesFiles>) =>
      ipcRenderer.invoke('getNotesFiles', ...args),
    readNoteFile: (...args: Parameters<ReadNoteFile>) => ipcRenderer.invoke('readNoteFile', ...args)
  })
} catch (e) {
  console.error(e)
}
