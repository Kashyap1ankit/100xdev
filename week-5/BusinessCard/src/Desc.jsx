export default function Desc({ des }) {
  let styles = {
    color: "black",
    width: "70%",
    fontFamily: "sans-serif",
  };
  return (
    <>
      <div style={styles}>
        <p>{des}</p>
      </div>
    </>
  );
}
