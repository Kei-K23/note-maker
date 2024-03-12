import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolated must be set to true')
}

try {
  contextBridge.exposeInMainWorld('context', {})
} catch (e) {
  console.error(e)
}
