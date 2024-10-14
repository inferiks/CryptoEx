import { Link as MUILink } from "@mui/material"
import './header.sass'
import telegram from '../../assets/telegramLogo.svg'

const Header = () => {

  return (
    <header className="header">
      <div className="header-logo">EXCHANGE</div>
      <div className="header-buttons">
        <MUILink href="#" underline="no" className="header-buttons__el" color="black">Buy crypto</MUILink>
        <MUILink href="#" underline="no" className="header-buttons__el" color="black">About us</MUILink>
        <MUILink href="#" underline="no" className="header-buttons__el" color="black">Reviews</MUILink>
      </div>
      <a href="https://t.me" target="_blank" className="header-contacts">
        <img src={telegram}></img>
      </a>
    </header>
    // <MUILink>test</MUILink>
  )
}

export default Header