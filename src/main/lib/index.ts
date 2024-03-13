import { APPDIRName, FILE_ENCODING } from '@shared/constant'
import { NoteInfo } from '@shared/models'
import {
  CreateNewNoteFile,
  DeleteNoteFile,
  GetNotesFiles,
  ReadNoteFile,
  WriteNoteFile
} from '@shared/type'
import { dialog } from 'electron'
import { ensureDir, readFileSync, readdir, remove, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'
import path from 'path'

export const getRootDir = () => {
  return `${homedir()}/${APPDIRName}`
}

export const getNotesFiles: GetNotesFiles = async () => {
  const root = getRootDir()

  await ensureDir(root)

  const notesFiles = await readdir(root, {
    encoding: FILE_ENCODING,
    withFileTypes: false
  })

  const notes = notesFiles.filter((file) => file.endsWith('.md'))

  return Promise.all(notes.map(getFileStat))
}

export const getFileStat = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)

  return {
    title: filename.replace(/\.md*/, ''),
    lastEdited: fileStats.mtimeMs
  }
}

export const readNoteFile: ReadNoteFile = async (filename) => {
  return readFileSync(`${getRootDir()}/${filename}.md`, {
    encoding: FILE_ENCODING
  })
}

export const writeNoteFile: WriteNoteFile = async (filename, content) => {
  console.log('Write note: ', filename)
  return writeFile(`${getRootDir()}/${filename}.md`, content, { encoding: FILE_ENCODING })
}

export const createNewNoteFile: CreateNewNoteFile = async () => {
  const root = getRootDir()

  await ensureDir(root)

  const filePath = dialog.showSaveDialogSync({
    title: 'Create New Note',
    defaultPath: `${root}/Untitled.md`,
    buttonLabel: 'Create',
    showsTagField: false,
    properties: ['showOverwriteConfirmation'],
    filters: [
      {
        name: 'Markdown',
        extensions: ['md']
      }
    ]
  })

  if (!filePath) return false

  const { name: filename, dir: parentDir } = path.parse(filePath)

  if (parentDir !== root) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Note creation filed',
      message: `Cannot create note outside of the ${root} directory`
    })
    return false
  }

  await writeNoteFile(filename, '')

  return filename
}

export const deleteNoteFile: DeleteNoteFile = async (filename) => {
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Note',
    message: `Are you sure you want to delete the note "${filename}"?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) return false

  await remove(`${getRootDir()}/${filename}.md`)
  return true
}
