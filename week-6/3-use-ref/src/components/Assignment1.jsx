import { useEffect, useRef, useState } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
  const [clicked, setClicked] = useState(false);
  const inpRef = useRef();
  useEffect(() => {
    inpRef.current.focus();
  }, [clicked]);

  const handleButtonClick = () => {
    inpRef.current.value = "clicked";
    setClicked(!clicked);
  };

  return (
    <div>
      <input type="text" placeholder="Enter text here" ref={inpRef} />
      <button onClick={handleButtonClick}>Focus Input</button>
    </div>
  );
}
