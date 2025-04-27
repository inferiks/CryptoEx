import { Grid2 as Grid, Checkbox, FormControlLabel, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SwapIcon from "../common/SwapIcon";
import BlockBuy from "./BlockBuy";
import BlockSell from "./BlockSell";

import './exchange.sass';

export default function Exchange() {
  const navigate = useNavigate();

  const [firstComponentType, setFirstComponentType] = useState(null);
  const [secondComponentType, setSecondComponentType] = useState(null);
  const [firstAmount, setFirstAmount] = useState(0);
  const [secondAmount, setSecondAmount] = useState(0);
  const [firstCurrency, setFirstCurrency] = useState(null);
  const [secondCurrency, setSecondCurrency] = useState(null);

  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState(null); // Добавлено для отладки

  

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

  const handleSubmitOrder = async () => {
    // Валидация данных
    if (!email || !walletAddress || !firstCurrency || !secondCurrency || !firstAmount || !secondAmount) {
      setError("Please fill in all fields before proceeding.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      setDebugInfo(null);

      const currencyIds = {
        "USD": 1,
        "RUB": 2,
        "EUR": 3,
        "GEL": 4,
        "KZT": 5,
        "BYN": 6,
        "BTC": 7,
        "ETH": 8,
        "USDT": 9,
        "USDC": 10,
        "TON": 11,
      };

      const orderData = {
        email,
        from_currency: firstCurrency,
        to_currency: secondCurrency,
        amount: firstAmount,
        rate: parseFloat((secondAmount / firstAmount).toFixed(8)), // Ограничиваем до 8 знаков
        total: secondAmount,
        payment_details: currencyIds[firstCurrency],
      };
      
      console.log("Sending order data:", orderData);

      const response = await fetch('http://localhost:8000/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      console.log("Response status:", response.status);
      console.log("Response status text:", response.statusText);
      
      // Получаем тело ответа как текст для отладки
      const responseText = await response.text();
      console.log("Raw response:", responseText);
      
      let responseData;
      try {
        // Пробуем распарсить JSON только если есть что парсить
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        setDebugInfo({
          status: response.status,
          statusText: response.statusText,
          rawResponse: responseText
        });
        throw new Error("Server response is not valid JSON");
      }

      if (!response.ok) {
        console.error('Error details:', responseData);
        // Сохраняем подробную информацию об ошибке
        setDebugInfo({
          status: response.status,
          statusText: response.statusText,
          errorData: responseData
        });
        throw new Error(responseData.message || responseData.detail || 'Failed to create order');
      }

      const orderId = responseData.id;
      console.log("Order created successfully with ID:", orderId);
      navigate(`/order/${orderId}`);
    } catch (err) {
      console.error("Order submission error:", err);
      setError(err.message || "Unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Grid className="exchange" container>

      <BlockSell
        fetchURL='http://localhost:3001'
        title="You receive"
        linkedComponent={firstComponentType}
        onCurrencyTypeChange={handleSecondComponentChange}
        onAmountChange={handleSecondAmountChange}
        otherComponentAmount={firstAmount}
        otherComponentCurrency={firstCurrency}
        isFirstComponent={false}
      />

      <SwapIcon
        isClickable={true}
        onClick={() => {
          const temp = firstComponentType;
          handleFirstComponentChange(secondComponentType);
          handleSecondComponentChange(temp);
        }}
      />

      <BlockBuy
        fetchURL='http://localhost:3001'
        title="You give"
        linkedComponent={secondComponentType}
        onCurrencyTypeChange={handleFirstComponentChange}
        onAmountChange={handleFirstAmountChange}
        otherComponentAmount={secondAmount}
        otherComponentCurrency={secondCurrency}
        isFirstComponent={true}
      />

      <Grid className="exchange-final" xs={12}>
        <h2>Confirm order</h2>

        <div className="exchange-final__container">

          <div className="exchange-final__inputs">
            <div className="exchange-final__input">
              <TextField
                type="email"
                name="email"
                label="Enter your email"
                color="black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ maxWidth: '25rem', width: '100%' }}
              />
            </div>

            <div className="exchange-final__input">
              <TextField
                type="text"
                name="address"
                label="Enter your wallet address"
                color="black"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                sx={{ maxWidth: '25rem', width: '100%' }}
              />
            </div>

            <FormControlLabel
              control={<Checkbox required disableRipple disableTouchRipple />}
              label="Agree with AML/CTF & KYC"
            />
          </div>

          <div className="exchange-final__confirm">
            <h2>Check your data:</h2>

            <div className="exchange-final__currencies">
              <div>
                <span>You give:</span>
                <div className="exchange-final__result">
                  <span>{firstCurrency || "Not selected"}</span>
                </div>
              </div>

              <div>
                <span>You receive:</span>
                <div className="exchange-final__result">
                  <span>{secondCurrency || "Not selected"}</span>
                </div>
              </div>

              {error && (
                <div style={{ color: 'red', marginTop: '1rem' }}>
                  {error}
                </div>
              )}
              
              {/* Отображение отладочной информации */}
              {debugInfo && (
                <div style={{ marginTop: '1rem', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                  <h4>Debug Information:</h4>
                  <pre style={{ overflow: 'auto' }}>
                    {JSON.stringify(debugInfo, null, 2)}
                  </pre>
                </div>
              )}

              <Button
                className="exchange-final__btn"
                variant="contained"
                color="success"
                disableRipple
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Proceed to order"}
              </Button>

            </div>
          </div>

        </div>
      </Grid>

    </Grid>
  );
}