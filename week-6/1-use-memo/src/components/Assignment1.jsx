import { useState, useMemo } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input.
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
  const [input, setInput] = useState(0);
  const [count, setCount] = useState(0);
  // Your solution starts here
  let expensiveValue = 0;

  // Running this expensive operation using the useMemo so it will store the value of operation until it's dependency doesn't change

  const factorial = useMemo(() => {
    let f = 1;
    for (let i = 1; i <= input; i++) {
      f = f * i;
    }

    expensiveValue = f;
    console.log("re-rendered");
  }, [input]);

  // // Running this expensive operation normally so whenever the parent renders this will render automatically

  //   let f = 1;
  //   for (let i = 1; i <= input; i++) {
  //     f = f * i;
  //   }

  //   expensiveValue = f;
  //   console.log("re-rendered");

  // Your solution ends here

  return (
    <div>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
      />
      <p>Calculated Value: {expensiveValue}</p>

      {/* Adding another button so that we can check whether the useMemo is working or not */}

      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me : {count}
      </button>
    </div>
  );
}
