import {
  CreateNewNoteFile,
  DeleteNoteFile,
  GetNotesFiles,
  ReadNoteFile,
  UpdateNoteFilename,
  WriteNoteFile
} from '@shared/type'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolated must be set to true')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotesFiles: (...args: Parameters<GetNotesFiles>) =>
      ipcRenderer.invoke('getNotesFiles', ...args),
    readNoteFile: (...args: Parameters<ReadNoteFile>) =>
      ipcRenderer.invoke('readNoteFile', ...args),
    writeNoteFile: (...args: Parameters<WriteNoteFile>) =>
      ipcRenderer.invoke('writeNoteFile', ...args),
    createNewNoteFile: (...args: Parameters<CreateNewNoteFile>) =>
      ipcRenderer.invoke('createNewNoteFile', ...args),
    deleteNoteFile: (...args: Parameters<DeleteNoteFile>) =>
      ipcRenderer.invoke('deleteNoteFile', ...args),
    updateNoteFilename: (...args: Parameters<UpdateNoteFilename>) =>
      ipcRenderer.invoke('updateNoteFilename', ...args)
  })
} catch (e) {
  console.error(e)
}
