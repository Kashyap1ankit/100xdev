import Head from "./Head";
import Desc from "./Desc";
import Interest from "./Interest";
import Social from "./socail";
import "./WrapperCard.css";
import { useState } from "react";

export default function WrapperCard({
  name,
  des,
  interested,
  links,
  socailLinks,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card"
      onMouseEnter={() => {
        setHovered(true);
      }}
    >
      <Head name={name} />
      <Desc des={des} />
      <Interest interested={interested} />
      <Social socailLinks={socailLinks} links={links}></Social>
    </div>
  );
}
