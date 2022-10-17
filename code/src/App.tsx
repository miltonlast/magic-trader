import useDummyBitcoinPrices from "@hooks/useDummyBitcoinPrices";
import useFearAndGreed from "@hooks/useFearAndGreed";
import React, { useEffect, useState } from "react";
import { filter, map, timer, tap, interval } from "rxjs";

const App = () => {
  // const { fearAndGreed } = useFearAndGreed();
  const { dummyBitcoinPrices } = useDummyBitcoinPrices();

  // const esto = dummyBitcoinPrices?.length || 0;

  // console.log("and ", (esto + 1) / 2);
  // console.log("and ", dummyBitcoinPrices);

  // // emit every hour at 0 minutes, 0 seconds
  // const onHour$ = timer(60000).pipe(
  //   map(() => new Date()),
  //   filter((now) => now.getMinutes() === 38)
  // );

  // useEffect(() => {
  //   onHour$.subscribe(() => console.log("It's 10:00, let's do some work..."));
  // }, []);

  function median(numbers: Array<number>) {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
  }

  console.log(median([19, 26, 28, 29, 34, 38, 43, 45, 49, 51, 62]));

  return (
    <>
      <div>
        <h1>Bitcoin Trader</h1>
      </div>
    </>
  );
};

export default App;
