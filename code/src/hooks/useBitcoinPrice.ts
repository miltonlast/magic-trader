import { IBitcoinPrice } from "@interfaces/bitcoin-price/IBitcoinPrice";
import axios from "axios";
import { useEffect, useState } from "react";

const useBitcoinPrice = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState<IBitcoinPrice>();

  const cancelToken = axios.CancelToken.source();

  useEffect(() => {
    axios
      .get<IBitcoinPrice>(`${process.env.REACT_APP_BITCOIN_PRICES}`, {
        cancelToken: cancelToken.token,
      })
      .then((response) => {
        setBitcoinPrice(response.data);
      })
      .catch(console.error);

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return {
    bitcoinPrice,
  };
};

export default useBitcoinPrice;
