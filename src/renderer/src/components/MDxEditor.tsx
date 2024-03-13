import {
  MDXEditor,
  codeBlockPlugin,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { selectedNote } from '@renderer/store'
import { useAtomValue } from 'jotai'

export const MDxEditor = () => {
  const note = useAtomValue(selectedNote)

  if (!note) return null

  return (
    <MDXEditor
      key={note.title}
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
