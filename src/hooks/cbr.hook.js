import { useEffect, useState } from 'react';

export function useCbr(targetCurrency) {
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrencyRate = async (symbol) => {
    const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const data = await response.json();
    return parseFloat(data.Valute[symbol]?.Value);
  };

  useEffect(() => {
    if (!targetCurrency) return;

    const convertUsdToTarget = async () => {
      setLoading(true);
      setError(null);

      try {
        const [usdToRub, targetToRub] = await Promise.all([
          fetchCurrencyRate("USD"),
          fetchCurrencyRate(targetCurrency)
        ]);

        if (!usdToRub || !targetToRub) {
          throw new Error("Невозможно получить курс валют");
        }

        const rate = usdToRub / targetToRub;
        setConvertedPrice(rate);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    convertUsdToTarget();
  }, [targetCurrency]);

  return { price: convertedPrice, loading, error };
}