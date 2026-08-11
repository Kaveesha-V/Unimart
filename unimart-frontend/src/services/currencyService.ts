export interface ExchangeRateResponse {
  rate: number;
  lastUpdated: string;
  source: string;
}

const FALLBACK_USD_TO_LKR = 300.0;

export async function fetchLiveUsdToLkrRate(): Promise<ExchangeRateResponse> {
  try {
    // Primary live open exchange rate API
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    if (response.ok) {
      const data = await response.json();
      if (data && data.rates && typeof data.rates.LKR === 'number') {
        return {
          rate: data.rates.LKR,
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: 'Open ER API (Live)',
        };
      }
    }
  } catch (err) {
    console.warn('Primary exchange rate API failed, trying fallback...', err);
  }

  try {
    // Secondary live currency API fallback
    const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
    if (response.ok) {
      const data = await response.json();
      if (data && data.usd && typeof data.usd.lkr === 'number') {
        return {
          rate: data.usd.lkr,
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: 'Currency API (Live)',
        };
      }
    }
  } catch (err) {
    console.warn('Secondary exchange rate API failed, using default fallback rate.', err);
  }

  return {
    rate: FALLBACK_USD_TO_LKR,
    lastUpdated: 'Fallback Rate',
    source: 'Default Fallback',
  };
}

export function convertUsdToLkr(usdAmount: number, rate: number = FALLBACK_USD_TO_LKR): number {
  return Math.round(usdAmount * rate);
}

export function formatLKR(usdAmount: number, rate: number = FALLBACK_USD_TO_LKR): string {
  const lkrAmount = convertUsdToLkr(usdAmount, rate);
  return `Rs. ${lkrAmount.toLocaleString('en-LK')}`;
}

export function formatUSD(usdAmount: number): string {
  return `$${usdAmount.toFixed(2)}`;
}
