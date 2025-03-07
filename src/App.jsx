import { QuestionsContextProvider } from './context/QuestionsContext'
import './App.css'
import Container from './components/Container'

function App() {

  return (
    <QuestionsContextProvider>
      <Container />
    </QuestionsContextProvider>
  )
}

export default App
