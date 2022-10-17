import { useEffect, useState } from "react";
import { filter, interval, map } from "rxjs";
import useBitcoinPrice from "@hooks/services/useBitcoinPrice";
import useDummyBitcoinPrices from "@hooks/services/useDummyBitcoinPrices";
import useFearAndGreed from "@hooks/services/useFearAndGreed";
import useMedian from "@hooks/useMedian";

const useNotificationMessage = () => {
  const [time, setTime] = useState("");

  const { dummyBitcoinPrices } = useDummyBitcoinPrices();
  const { bitcoinPrice } = useBitcoinPrice();
  const {
    fearAndGreed: { data },
  } = useFearAndGreed();
  const { median } = useMedian();

  const setLocalStorageTime = (time: string) => {
    localStorage.setItem("time-registered", time);
    setTime(time);
  };

  const checkTime$ = (value: string) => {
    return interval(60000)
      .pipe(
        map(() => {
          const today = new Date();
          const hours = today.getHours().toString().padStart(2, "0");
          const minutes = today.getMinutes().toString().padStart(2, "0");

          return `${hours}:${minutes}`;
        }),
        filter((x) => x === value)
      )
      .subscribe((x) => {
        const valueFearAndGreed = Number(data[0].value);
        const historyTradePrice = [...dummyBitcoinPrices, bitcoinPrice].map(
          (x) => x.last_trade_price
        );
        const medianPrice = median(historyTradePrice);

        if (
          bitcoinPrice.last_trade_price < medianPrice &&
          valueFearAndGreed < 20
        ) {
          alert("buy bitcoin");
        } else if (
          bitcoinPrice.last_trade_price > medianPrice &&
          valueFearAndGreed > 80
        ) {
          alert("sell bitcoin");
        } else {
          alert("hodl");
        }
      });
  };

  useEffect(() => {
    const timeRegistered = localStorage.getItem("time-registered");

    if (!!timeRegistered) {
      setTime(timeRegistered);
    }

    return () => {
      checkTime$(time).unsubscribe();
    };
  }, []);

  useEffect(() => {
    checkTime$(time);
  }, [time]);

  return {
    time,
    setLocalStorageTime,
  };
};

export default useNotificationMessage;
