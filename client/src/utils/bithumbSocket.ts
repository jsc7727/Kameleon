import { useState, useEffect } from 'react';

// WebSocket Ticker 데이터 가져오기
// 사용되는 곳 CoinMarket
export const useKlaySocket = (): string => {
  const [wsInstance, setWsInstance] = useState('');

  let ws: any;

  useEffect(() => {
    ws = new WebSocket('wss://pubwss.bithumb.com/pub/ws');

    let klaytnPrice = undefined;
    ws.onopen = () => {
      const request = {
        type: 'ticker',
        symbols: ['KLAY_KRW'],
        tickTypes: ['30M'],
      };
      ws.send(JSON.stringify(request));
    };

    ws.onmessage = (e: { data: Iterable<number> }) => {
      const data = JSON.parse(e.data.toString());
      klaytnPrice = data?.content?.closePrice;
      setWsInstance(klaytnPrice);
    };

    return () => {
      ws.close();
    };
  }, []);

  return wsInstance;
};
