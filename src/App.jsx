import { Container } from '@mui/material'
import Header from './components/header/Header'
import Exchange from './components/exchange/Exchange'

function App() {

  return (
    <>
      <Container maxWidth="lg">
        <Header />
        <Exchange />
      </Container>
    </>
  )
}

export default App
