export default function Head({ name }) {
  let styles = {
    color: "#96E9C6",
    fontSize: "50px",
    fontFamily: "verdana",
    letterSpacing: "1rem",
  };
  return (
    <>
      <h1 style={styles}>{name}</h1>
    </>
  );
}
