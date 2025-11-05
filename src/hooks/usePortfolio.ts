import { useCallback, useEffect, useRef, useState } from "react";

type Asset = {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  allocation?: number;
};

export function usePortfolio() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [topGainer, setTopGainer] = useState<Asset | null>(null);
  const [topLoser, setTopLoser] = useState<Asset | null>(null);
  const [connected, setConnected] = useState(true);

  const lastUpdate = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatNumber = (value: number) => Number(value.toFixed(2));

  const updateTopMovers = useCallback((list: Asset[]) => {
    if (list.length === 0) return;
    setTopGainer(list.reduce((a, b) => (a.change24h > b.change24h ? a : b)));
    setTopLoser(list.reduce((a, b) => (a.change24h < b.change24h ? a : b)));
  }, []);

  const initMockPortfolio = useCallback(() => {
    const mockData: Asset[] = [
      { symbol: "BTC", name: "Bitcoin", price: 65000, change24h: 1.2 },
      { symbol: "ETH", name: "Ethereum", price: 3200, change24h: -0.5 },
      { symbol: "ADA", name: "Cardano", price: 0.45, change24h: 0.3 },
      { symbol: "SOL", name: "Solana", price: 180, change24h: 2.1 },
    ];
    setAssets(mockData);
    updateTopMovers(mockData);
    setLoading(false);
  }, [updateTopMovers]);

  useEffect(() => {
    initMockPortfolio();

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      if (now - lastUpdate.current < 500) return;
      lastUpdate.current = now;

      setAssets((prev) => {
        const updated = prev.map((asset) => {
          const change = (Math.random() - 0.5) * 0.004;
          return {
            ...asset,
            price: formatNumber(asset.price * (1 + change)),
            change24h: formatNumber(asset.change24h + change * 100),
          };
        });
        updateTopMovers(updated);
        return updated;
      });
      if (Math.random() < 0.03) {
        setConnected(false);
        console.log("⚠️ Conexão mock perdida...");
        setTimeout(() => {
          setConnected(true);
          console.log("✅ Conexão mock restaurada");
        }, 2000);
      }
    }, 15000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [initMockPortfolio, updateTopMovers]);

const refreshPortfolio = useCallback(() => {
  setLoading(true);

  setTimeout(() => {
    setAssets((prev) => {
      const updated = prev.map((asset) => {
        const randomChange = (Math.random() - 0.5) * 0.02;
        const newPrice = formatNumber(asset.price * (1 + randomChange));
        const newChange24h = formatNumber(asset.change24h + randomChange * 100);

        return { ...asset, price: newPrice, change24h: newChange24h };
      });

      updateTopMovers(updated);
      return updated;
    });

    setLoading(false);
  }, 800);
}, [updateTopMovers]);



  return { assets, loading, connected, topGainer, topLoser, refreshPortfolio };
}
