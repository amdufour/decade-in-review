import { useRef, useEffect, useState } from "react";

const Warning = props => {
  const windowWidth = useRef(window.innerWidth);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    if (windowWidth.current <= 768) {
      setTimeout(() => {
        setVisibility(true);
      }, 4000);
    }
  }, [windowWidth]);

  const handleClick = () => {
    setVisibility(false);
  };

  return (
    <div className={`warning-container ${visibility ? "visible" : ""}`}>
      <div className="warning">
        <div className="explanation">This project is optimized for desktop screens. We recommend you take a look from a computer!</div>
        <button onClick={handleClick}>Got it!</button>
      </div>
    </div>
  );
};

export default Warning;