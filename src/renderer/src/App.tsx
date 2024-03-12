import { Content, Root, Sidebar, DraggableTopBar, ActionButtonsRow } from './components'

function App(): JSX.Element {
  return (
    <>
      <DraggableTopBar />
      <Root>
        <Sidebar className="p-3">
          <ActionButtonsRow className="flex items-center justify-between mt-1" />
        </Sidebar>
        <Content className="border-l bg-zinc-800/50 border-l-white/10">Content</Content>
      </Root>
    </>
  )
}

export default App
