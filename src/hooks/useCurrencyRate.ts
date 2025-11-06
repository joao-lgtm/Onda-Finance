import { useCallback, useEffect, useState } from "react";

type CurrencyConverterProps = {
  initialUsd?: number;
};

export function useCurrencyConverter({ initialUsd = 0 }: CurrencyConverterProps) {
  const [rate, setRate] = useState<number>(5.42)
  const [loading, setLoading] = useState(false);
  const [usdValue, setUsdValue] = useState<number>(initialUsd);
  const [brlValue, setBrlValue] = useState<number>(initialUsd * 5.42);
  
  const refreshRate = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const simulated = 5.3 + Math.random() * 0.3;
      setRate(parseFloat(simulated.toFixed(2)));
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    setUsdValue(initialUsd);
  }, [initialUsd]);

  useEffect(() => {
    setBrlValue(parseFloat((usdValue * rate).toFixed(2)));
  }, [rate, usdValue]);

  const convertToUsd = (brl: number) => {
    if (!rate) return;
    setUsdValue(parseFloat((brl / rate).toFixed(2)));
  };

  return {
    rate,
    loading,
    refreshRate,
    usdValue,
    brlValue,
    setUsdValue,
    setBrlValue,
    convertToUsd,
  };
}
