import { Grid2 as Grid, Checkbox, FormControlLabel, TextField, Button } from "@mui/material"
import { useState } from "react"
import OrderCurrency from "./OrderCurrency";
import './exchange.sass'
import { Link } from "react-router-dom";
import SwapIcon from "../common/SwapIcon";

export default function Exchange() {
  const [firstComponentType, setFirstComponentType] = useState(null);
  const [secondComponentType, setSecondComponentType] = useState(null);
  const [firstAmount, setFirstAmount] = useState(0);
  const [secondAmount, setSecondAmount] = useState(0);
  const [firstCurrency, setFirstCurrency] = useState(null);
  const [secondCurrency, setSecondCurrency] = useState(null);

  const handleFirstAmountChange = (amount, currency, selectedValue) => {
    setFirstAmount(amount);
    setFirstCurrency(selectedValue);
  };

  const handleSecondAmountChange = (amount, currency, selectedValue) => {
    setSecondAmount(amount);
    setSecondCurrency(selectedValue);
  };

  const handleFirstComponentChange = (type) => {
    setFirstComponentType(type);
    setSecondComponentType(type === 'fiat' ? 'crypto' : 'fiat');
  };

  const handleSecondComponentChange = (type) => {
    setSecondComponentType(type);
    setFirstComponentType(type === 'fiat' ? 'crypto' : 'fiat');
  };

  return (
    <Grid className="exchange" container >

      <OrderCurrency
        fetchURL='http://localhost:3001'
        title="You give"
        linkedComponent={secondComponentType}
        onCurrencyTypeChange={handleFirstComponentChange}
        onAmountChange={handleFirstAmountChange}
        otherComponentAmount={secondAmount}
        otherComponentCurrency={secondCurrency}
        isFirstComponent={true}
      />

      <SwapIcon isClickable={true} onClick={() => {
        const temp = firstComponentType;
        handleFirstComponentChange(secondComponentType);
        handleSecondComponentChange(temp);
      }} />

      <OrderCurrency
        fetchURL='http://localhost:3001'
        title="You receive"
        linkedComponent={firstComponentType}
        onCurrencyTypeChange={handleSecondComponentChange}
        onAmountChange={handleSecondAmountChange}
        otherComponentAmount={firstAmount}
        otherComponentCurrency={firstCurrency}
        isFirstComponent={false}
      />

      <Grid className="exchange-final" size={12} >
        <h2>Confirm order</h2>
        <div className="exchange-final__container">
          <div className="exchange-final__inputs">
            <div className="exchange-final__input">
              <TextField
                type="email"
                name="email"
                label="Enter your email"
                color="black"
                sx={{ maxWidth: '25rem', width: '100%' }}
              ></TextField>
            </div>

            <div className="exchange-final__input">
              <TextField
                className="exchange-order__address"
                type="text"
                name="address"
                label="Enter your wallet address"
                color="black"
                sx={{ maxWidth: '25rem', width: '100%' }}
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
                <Button variant="contained" color="success" disableRipple sx={{ width: '12rem', margin: '0 auto' }}>Proceed to order</Button>
              </Link>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}