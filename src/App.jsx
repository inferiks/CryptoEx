import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/Footer"


function App() {

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
