import { useState } from "react";

function App() {
  //easy way for creating a lot of buttons
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "+", "-", "."];

  const updateCalc = (value) => {
    if (
      //cant start with op and cant have 2 op in a row
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);

    if (!ops.includes(value)) {
      // eslint-disable-next-line no-eval
      setResult(eval(calc + value).toString());
    }
  };

  const createIntegers = () => {
    const digits = [];

    for (let i = 0; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => updateCalc(i.toString())}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const calculate = () => {
    // eslint-disable-next-line no-eval
    setCalc(eval(calc).toString());
  };

  const deleteLast = () => {
    if (calc === '') {
      return;
    }
	const value = calc.slice(0,-1)

    setCalc(value);
  };

  return (
    <div className="App">
      <div className="Calculator">
        <div className="Display">
          {/* if no calc value equals 0 */}
          {result ? <span>({result})</span> : '' }&nbsp;
          {calc || 0}
        </div>
        <div className="operator">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>
          <button onClick={deleteLast}>DEL</button>
          <button onClick={calculate}>=</button>
        </div>
        <div className="integers">
          {createIntegers()}
          <button onClick={calculate}>=</button>
          <button onClick={() => updateCalc(".")}>.</button>
        </div>
      </div>
    </div>
  );
}

export default App;
