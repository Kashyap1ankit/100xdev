import { useState } from "react";
import "./interest.css";

export default function Interest({ interested }) {
  const [expanded, setExpanded] = useState(false);
  function replace(event) {
    setExpanded(!expanded);
  }

  return (
    <>
      <div className="interest-container">
        <div className="heading">
          <h1>Interests</h1>

          {expanded ? (
            <p onClick={replace} className="plus">
              -
            </p>
          ) : (
            <p onClick={replace} className="plus">
              +
            </p>
          )}
        </div>

        <div className={`interest ${expanded ? "" : "hidden"}`}>
          {interested.map((e) => {
            return <p>{e}</p>;
          })}
        </div>
      </div>
    </>
  );
}
