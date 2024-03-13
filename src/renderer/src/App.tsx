import { useRef } from 'react'
import {
  Content,
  Root,
  Sidebar,
  DraggableTopBar,
  ActionButtonsRow,
  NotePreviewList,
  MDxEditor,
  FloatingNoteTitle
} from './components'
import { ToastContainer } from 'react-toastify'

function App(): JSX.Element {
  const noteListRef = useRef<HTMLLIElement | null>(null)

  const resetScroll = () => {
    noteListRef?.current?.scrollTo(0, 0)
  }

  return (
    <>
      <DraggableTopBar />
      <Root>
        <Sidebar className="p-3 ">
          <ActionButtonsRow className="z-10 flex items-center justify-between " />
          <NotePreviewList className="mt-4 " resetScroll={resetScroll} />
        </Sidebar>
        <Content className="border-l bg-zinc-800/50 border-l-white/10">
          <FloatingNoteTitle className="mt-3" />
          <MDxEditor />
        </Content>
      </Root>
      <ToastContainer />
    </>
  )
}

export default App
