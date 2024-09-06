import { Grid2 } from "@mui/material"
import { useState } from "react"
import './exchange.sass'

const Exchange = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [selectedFiat, setSelectedFiat] = useState(null);

  const cryptoCurrencies = ["BTC", "ETH", "USDT (TRC20)", "USDT (ERC20)", "TON"];
  const fiatCurrencies = ["RUB", "USD", "EUR"];

  const handleCryptoClick = (currency) => {
    setSelectedCrypto(currency);
  };

  const handleFiatClick = (currency) => {
    setSelectedFiat(currency);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Grid2 className="exchange" container spacing={2}>

      <Grid2 className="exchange-order" size={5}>
        <h2 className="exchange-order__title">You give</h2>
        <form onSubmit={handleSubmit}>
          <div className="exchange-order__currency" style={{ margin: '20px 0' }}>
            <div className="exchange-order__crypto">
              <h3>Select value</h3>
              <ul className='exchange-order__crypto-list'>
                {cryptoCurrencies.map((currency, index) => (
                  <li
                    key={index}
                    className={selectedCrypto === currency ? "exchange-order__crypto-item-active" : "exchange-order__crypto-item"}
                    onClick={() => handleCryptoClick(currency)}>
                    {currency}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button type="submit" className="exchange-order__submit">Submit</button>
        </form>
      </Grid2>

      <svg onClick={() => console.log('click')} className="exchange-order__swap" xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><path fill="#000000" d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z" /></svg>

      <Grid2 className="exchange-order" size={5}>
        {/* Сделать формик для отправки формы на ордер */}
        <h2 className="exchange-order__title">You get</h2>
        <form onSubmit={handleSubmit}>
          <div className="exchange-order__currency" style={{ margin: '20px 0' }}>
            <div className="exchange-order__currency_crypto">
              <label htmlFor="select-menu">CURRENCY NAME </label>

            </div>
            <div className="exchange-order__currency_fiat">
              <label htmlFor="select-menu">CURRENCY NAME </label>

            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </Grid2>

    </Grid2>
  )
}

export default Exchange