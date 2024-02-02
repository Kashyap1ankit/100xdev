export default function Interest({ interested }) {
  let styles = {
    color: "#F2F597",
  };
  return (
    <>
      <div>
        <h1 style={styles}>Interests:</h1>
        {interested.map((e) => {
          return <p>{e}</p>;
        })}
      </div>
    </>
  );
}
