import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Grid2 as Grid, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import './orderCurrency.sass';

const OrderCurrency = ({ fetchURL, title, linkedComponent, onCurrencyTypeChange }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [price, setPrice] = useState('Select currency');
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState(null);
  const [showCurrencies, setShowCurrencies] = useState(null);
  const [currentSymbol, setCurrentSymbol] = useState(null);

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
    // Initial data loading if needed
    // getCurrency(fetchURL, 'fiatCurrencies');
    // getCurrency(fetchURL, 'cryptoCurrencies');
  }, []);

  const handleCryptoClick = (currency, price, symbol) => {
    setSelectedValue(currency);
    setPrice(price);
    setCurrentSymbol(symbol);
  };

  const handleInputChange = (e) => {
    const newAmount = parseFloat(e.target.value) || 0;
    setAmount(newAmount);
  }

  const handleCurrencyTypeChange = (type) => {
    setCurrency(type);
    getCurrency(fetchURL, type === 'fiat' ? 'fiatCurrencies' : 'cryptoCurrencies');
    setShowCurrencies(true);

    // Notify parent component about the currency type change
    if (onCurrencyTypeChange) {
      onCurrencyTypeChange(type);
    }
  };

  // Effect to update currency type when linkedComponent changes
  useEffect(() => {
    if (linkedComponent) {
      // Set the opposite currency type
      const oppositeType = linkedComponent === 'fiat' ? 'crypto' : 'fiat';

      // Only update if it's different from current value
      if (currency !== oppositeType) {
        setCurrency(oppositeType);

        // Explicitly fetch data for the new currency type
        const endpoint = oppositeType === 'fiat' ? 'fiatCurrencies' : 'cryptoCurrencies';
        getCurrency(fetchURL, endpoint);

        // Show currencies dropdown
        setShowCurrencies(true);
      }
    }
  }, [linkedComponent, fetchURL, currency]);

  const totalPrice = (price * amount).toFixed(2);

  const currenciesWithKeys = dataArray.map(value => ({ ...value, id: uuidv4() }));

  return (
    <Grid className="exchange-order" size={{ xs: 5 }}>
      <h2>{title}</h2>
      <div className="exchange-order__select">
        <motion.button
          className={`exchange-order__select_type ${currency === 'fiat' ? 'exchange-order__select_type-active' : ''}`}
          onClick={() => handleCurrencyTypeChange('fiat')}>
          Fiat
        </motion.button>
        <button
          className={`exchange-order__select_type ${currency === 'crypto' ? 'exchange-order__select_type-active' : ''}`}
          onClick={() => handleCurrencyTypeChange('crypto')}>
          Crypto
        </button>
      </div>
      <div className="exchange-order__currency" style={{ margin: '20px 0' }}>
        <div className="exchange-order__crypto">
          <motion.div
            className={showCurrencies ? "exchange-order__list exchange-order__list_active" : "exchange-order__list"}
            animate={{ height: showCurrencies ? "20rem" : 0, opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
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
          </motion.div>
          <TextField
            type="number"
            variant="standard"
            className="exchange-order__amount"
            onWheel={(e) => e.target.blur()}
            name="amount"
            label="Enter amount"
            autoComplete="off"
            placeholder={amount.toString()}
            slotProps={{
              inputLabel: {
                shrink: true,
              }
            }}
            sx={{ maxWidth: "150px", marginTop: "10px" }}
            onChange={handleInputChange} />
          <div className="exchange-order__price">Price: {currentSymbol} <b>{isNaN(totalPrice) ? 'Select currency' : totalPrice}</b></div>
        </div>
      </div>
    </Grid>
  );
};

export default OrderCurrency;