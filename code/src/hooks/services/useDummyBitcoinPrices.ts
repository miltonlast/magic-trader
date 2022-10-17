import { useEffect, useState } from "react";
import axios from "axios";
import { IBitcoinPrice } from "@interfaces/bitcoin-price/IBitcoinPrice";

const useDummyBitcoinPrices = () => {
  const [dummyBitcoinPrices, setDummyBitcoinPrice] = useState<
    Array<IBitcoinPrice>
  >(Array<IBitcoinPrice>());

  const cancelToken = axios.CancelToken.source();

  useEffect(() => {
    axios
      .get<Array<IBitcoinPrice>>(
        `${process.env.REACT_APP_DUMMY_BITCOIN_PRICES}`,
        {
          cancelToken: cancelToken.token,
        }
      )
      .then((response) => {
        setDummyBitcoinPrice(response.data);
      })
      .catch(console.error);

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return {
    dummyBitcoinPrices,
  };
};

export default useDummyBitcoinPrices;
