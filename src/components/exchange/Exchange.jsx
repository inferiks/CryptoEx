import { Grid2 as Grid, Checkbox, FormControlLabel, TextField, Button } from "@mui/material"
import OrderCurrency from "./OrderCurrency";
import './exchange.sass'
import { Link } from "react-router-dom";
import SwapIcon from "../common/SwapIcon";

export default function Exchange() {
  const cryptoCurrencies = ["BTC", "ETH", "USDT (TRC20)", "USDT (ERC20)", "TON", "Z-cash", "LTC", "BUSD"];
  const fiatCurrencies = ["RUB", "USD", "EUR"];

  const currency = 5.38

  return (
    <Grid className="exchange" container >

      <OrderCurrency title="You give" currencies={cryptoCurrencies} currency={currency} />

      <SwapIcon isClickable={true} onClick={() => console.log('swap')} />

      <OrderCurrency title="You recieve" currencies={fiatCurrencies} currency={currency} />

      <Grid className="exchange-final" size={12} style={{ 'margin': '20px auto' }} >
        <h2>Confirm order</h2>
        <div className="exchange-final__container">
          <div className="exchange-final__inputs">
            <div className="exchange-final__input">
              <TextField
                type="email"
                name="email"
                label="Enter your email"
                color="black"
                sx={{ minWidth: 'min(25rem)' }}
              ></TextField>
            </div>

            <div className="exchange-final__input">
              <TextField
                className="exchange-order__address"
                type="text"
                name="address"
                label="Enter your wallet address"
                color="black"
                sx={{ minWidth: 'min(25rem)' }}
              ></TextField>
            </div>

            <FormControlLabel
              control={<Checkbox required disableRipple disableTouchRipple />}
              label="Agree with AML/CTF & KYC" />


          </div>

          <div className="exchange-final__confirm" >
            <h2>Check your data:</h2>
            <div className="exchange-final__currencies">
              <div>
                <span>You give:</span>
                <div className="exchange-final__result">
                  <img src="https://cryptologos.cc/logos/tether-usdt-logo.png" style={{ 'width': '25px', }} />
                  <span>USDT TRC20</span>
                </div>
              </div>
              <div>
                <span>You receive:</span>
                <div className="exchange-final__result">
                  <img src="https://cryptologos.cc/logos/tether-usdt-logo.png" style={{ 'width': '25px' }} />
                  <span>USDT TRC20</span>
                </div>
              </div>
              <Link to="/order" >
                <Button variant="contained" color="success" disableRipple sx={{ width: '10vw', margin: '0 auto' }}>Proceed to order</Button>
              </Link>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}