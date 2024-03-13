import { APPDIRName, FILE_ENCODING } from '@shared/constant'
import { NoteInfo } from '@shared/models'
import { GetNotesFiles } from '@shared/type'
import { ensureDir, readdir, stat } from 'fs-extra'
import { homedir } from 'os'

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
