import {
  MDXEditor,
  MDXEditorMethods,
  codeBlockPlugin,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { saveNote, selectedNote } from '@renderer/store'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const MDxEditor = () => {
  const note = useAtomValue(selectedNote)
  const writeNote = useSetAtom(saveNote)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSave = throttle(
    async (content: NoteContent) => {
      if (!note) return

      await writeNote(content)
    },
    3000,
    {
      leading: false,
      trailing: true
    }
  )

  const handelSave = async () => {
    if (!note) return
    handleAutoSave.cancel()

    const content = editorRef.current?.getMarkdown()

    if (!content) return

    await writeNote(content)
  }

  if (!note) {
    return (
      <div className="flex items-center justify-center h-screen px-8 py-5 text-zinc-500 max-w-none">
        <div className="space-y-3 text-center">
          <h2>To write down your awesome ideas</h2>
          <h3>Create new note by clicking &quot;Pen&quot; icon or select existing</h3>
          <p className="absolute text-sm bottom-4 left-[50%] translate-y-[-50%]">
            Made with 💙 by{' '}
            <a
              className="text-sky-500"
              rel="noreferrer"
              href="https://github.com/Kei-K23"
              target="_blank"
            >
              Kei-K23
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <MDXEditor
      ref={editorRef}
      key={note.title}
      onBlur={handelSave}
      onChange={handleAutoSave}
      markdown={note.content}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        codeBlockPlugin()
      ]}
      contentEditableClassName="text-white outline-none  max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:text-white prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-li:text-white prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}
