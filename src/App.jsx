import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import ScrollToTop from './components/common/ScrollToTop'
import { Home } from './pages/home/Home'
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/Footer"
import Order from './components/order/Order'
import NoMatch from './pages/noMatch/NoMatch'
import AmlKyc from './pages/amlKyc/AmlKyc'

function App() {

  const theme = createTheme({
    typography: {
      fontFamily:
        'Nunito, Arial, sans-serif'
    }
  })

  return (
    <Router>
      <ScrollToTop />
      <ThemeProvider theme={theme}>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/aml-kyc" element={<AmlKyc />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
