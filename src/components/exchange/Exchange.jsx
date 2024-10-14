import { Grid2 as Grid, Checkbox, FormControlLabel, TextField, Button } from "@mui/material"
import OrderCurrency from "./OrderCurrency";
import './exchange.sass'

export default function Exchange() {
  return (
    <Grid className="exchange" container >

      <OrderCurrency title="You give" />

      <svg onClick={() => console.log('swap')} className="exchange-order__swap" xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path fill="#000000" d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z" /></svg>

      <OrderCurrency title="You recieve" />

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
                  <img src="https://cryptologos.cc/logos/tether-usdt-logo.png" style={{ 'width': '25px' }} />
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
              <Button variant="contained" color="success" disableRipple sx={{ width: '10vw', margin: '0 auto' }}>Proceed to order</Button>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}