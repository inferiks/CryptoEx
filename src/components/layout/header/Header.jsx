import { Link as MUILink } from "@mui/material"
import './header.sass'
import telegram from '../../../assets/telegramLogo.svg'
import { Link } from "react-router-dom"

const Header = () => {

  return (
    <header className="header">
      <Link className="header-logo" to="/">
        EXCHANGE
      </Link>

      <div className="header-buttons">
        <MUILink href="#" underline="none" className="header-buttons__el" color="black">Buy crypto</MUILink>
        <MUILink href="#" underline="none" className="header-buttons__el" color="black">About us</MUILink>
        <MUILink href="#" underline="none" className="header-buttons__el" color="black">Reviews</MUILink>
      </div>
      <a href="https://t.me" target="_blank" className="header-contacts">
        <img src={telegram}></img>
      </a>
    </header>
  )
}

export default Header