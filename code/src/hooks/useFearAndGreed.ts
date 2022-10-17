import { useEffect, useState } from "react";
import { IFearAndGreed } from "@interfaces/fear-and-greed/IFearAndGreed";
import axios from "axios";

const useFearAndGreed = () => {
  const [fearAndGreed, setFearAndGreed] = useState<IFearAndGreed>();

  const cancelToken = axios.CancelToken.source();

  useEffect(() => {
    axios
      .get<IFearAndGreed>(`${process.env.REACT_APP_FEAR_AND_GREED}`, {
        cancelToken: cancelToken.token,
      })
      .then((response) => {
        setFearAndGreed(response.data);
      })
      .catch(console.error);

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return {
    fearAndGreed,
  };
};

export default useFearAndGreed;
