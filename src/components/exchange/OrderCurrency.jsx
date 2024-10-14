import { useState } from "react";
import { Grid2 as Grid, TextField } from "@mui/material";

import './orderCurrency.sass'

const OrderCurrency = ({ title }) => {
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [selectedFiat, setSelectedFiat] = useState(null);
  const [price, setPrice] = useState(5.38)

  const cryptoCurrencies = ["BTC", "ETH", "USDT (TRC20)", "USDT (ERC20)", "TON"];
  const fiatCurrencies = ["RUB", "USD", "EUR"];
  const currency = 5.38

  const handleCryptoClick = (currency) => {
    setSelectedCrypto(currency);
  };

  const handleFiatClick = (currency) => {
    setSelectedFiat(currency);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleInputChange = (e) => {
    const price = (e.target.value * currency).toFixed(2)
    setPrice(price)
  }

  return (
    <Grid className="exchange-order" size={{ xs: 5 }}>
      <h2 className="exchange-order__title">{title}</h2>
      <div className="exchange-order__currency" style={{ margin: '20px 0' }}>
        <div className="exchange-order__crypto">
          <div className="exchange-order__list">
            <h3>Select value</h3>
            <ul>
              {cryptoCurrencies.map((currency, index) => (
                <li
                  key={index}
                  className={selectedCrypto === currency ? "exchange-order__item_active" : "exchange-order__item"}
                  onClick={() => handleCryptoClick(currency)}>
                  {currency}
                </li>
              ))}
            </ul>
          </div>
          <TextField
            type="number"
            variant="standard"
            className="exchange-order__amount"
            onWheel={(e) => e.target.blur()}
            name="amount"
            label="Enter amount"
            autoComplete="off"
            slotProps={{
              inputLabel: {
                shrink: true,
              }
            }}
            sx={{ maxWidth: "150px", marginTop: "10px" }}
            onChange={handleInputChange} ></TextField>
          <div className="exchange-order__price">Price: <b>${price}</b></div>
        </div>
      </div>
    </Grid >
  )
}

export default OrderCurrency