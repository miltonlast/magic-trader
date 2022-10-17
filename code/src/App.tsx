import React, { ChangeEvent } from "react";
import useNotificationMessage from "@hooks/useNotificationMessage";

const App = () => {
  const { time, setLocalStorageTime } = useNotificationMessage();

  return (
    <div>
      <h1>Bitcoin Trader</h1>

      <label htmlFor="notification-time">Select notification time</label>
      <br />
      <input
        id="notification-time"
        type="time"
        value={time}
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
          setLocalStorageTime(value)
        }
      />
    </div>
  );
};

export default App;
