import { useEffect, useState } from "react";
import { Grid2 as Grid, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import './orderCurrency.sass'

const OrderCurrency = ({ fetchURL, currencyType, title }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [price, setPrice] = useState('Select currency');
  const [amount, setAmount] = useState(1);
  const [currentSymbol, setCurrentSymbol] = useState(null)

  const getCurrency = async (url, currencyType) => {
    try {
      const res = await fetch(`${url}/${currencyType}`, { method: "GET" });
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      const data = await res.json();
      setDataArray(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getCurrency(fetchURL, currencyType);
  }, []);

  const handleCryptoClick = (currency, price, symbol) => {
    setSelectedValue(currency);
    setPrice(price)
    setCurrentSymbol(symbol)
  };

  const handleInputChange = (e) => {
    const newAmount = parseFloat(e.target.value) || 0
    setAmount(newAmount)
  }

  const totalPrice = (price * amount).toFixed(2)

  const currenciesWithKeys = dataArray.map(value => ({ ...value, id: uuidv4() }))

  return (
    <Grid className="exchange-order" size={{ xs: 5 }}>
      <h2 className="exchange-order__title">{title}</h2>
      <div className="exchange-order__currency" style={{ margin: '20px 0' }}>
        <div className="exchange-order__crypto">
          <div className="exchange-order__list">
            <h3>Select value</h3>
            <ul>
              {currenciesWithKeys.map(({ name, id, price, symbol }) => (
                <li
                  key={id}
                  className={selectedValue === name ? "exchange-order__item_active" : "exchange-order__item"}
                  onClick={() => handleCryptoClick(name, price, symbol)}>
                  {name}
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
            placeholder={amount}
            slotProps={{
              inputLabel: {
                shrink: true,
              }
            }}
            sx={{ maxWidth: "150px", marginTop: "10px" }}
            onChange={handleInputChange} ></TextField>
          <div className="exchange-order__price">Price: {currentSymbol} <b>{isNaN(totalPrice) ? 'Select currency' : totalPrice}</b></div>
        </div>
      </div>
    </Grid >
  )
}

export default OrderCurrency