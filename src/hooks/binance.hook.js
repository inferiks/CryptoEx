import { useEffect, useState } from 'react';

export function useBinance(symbol) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchPrice = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`
        );
        if (!response.ok) throw new Error('Ошибка запроса');
        const data = await response.json();
        setPrice(parseFloat(data.price));
      } catch (err) {
        setError(err.message || 'Ошибка получения курса');
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [symbol]);

  return { price, loading, error };
}