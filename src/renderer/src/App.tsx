import { Content, Root, Sidebar, DraggableTopBar } from './components'

function App(): JSX.Element {
  return (
    <>
      <DraggableTopBar />
      <Root>
        <Sidebar className="p-3">Sidebar</Sidebar>
        <Content className="border-l bg-zinc-800/50 border-l-white/10">Content</Content>
      </Root>
    </>
  )
}

export default App
