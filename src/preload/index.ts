import { GetNotesFiles, ReadNoteFile, WriteNoteFile } from '@shared/type'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolated must be set to true')
}

try {
  contextBridge.exposeInMainWorld('context', {
    getNotesFiles: (...args: Parameters<GetNotesFiles>) =>
      ipcRenderer.invoke('getNotesFiles', ...args),
    readNoteFile: (...args: Parameters<ReadNoteFile>) =>
      ipcRenderer.invoke('readNoteFile', ...args),
    writeNoteFile: (...args: Parameters<WriteNoteFile>) =>
      ipcRenderer.invoke('writeNoteFile', ...args),
    locale: navigator.language
  })
} catch (e) {
  console.error(e)
}
