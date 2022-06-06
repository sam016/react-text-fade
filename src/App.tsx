import { useState, useEffect } from "react";
import "./styles.css";
import Text from "./Text";

const NAMES = ["Lorem", "Ipsum", "Zorem"];

export default function App() {
  const [ind, setInd] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setInd((ind) => (ind + 1) % NAMES.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Text>{NAMES[ind]}</Text>
    </div>
  );
}
