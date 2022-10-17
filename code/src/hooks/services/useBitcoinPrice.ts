import { useEffect, useState } from "react";
import axios from "axios";
import { IBitcoinPrice } from "@interfaces/bitcoin-price/IBitcoinPrice";

const useBitcoinPrice = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState<IBitcoinPrice>(
    <IBitcoinPrice>{}
  );

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
