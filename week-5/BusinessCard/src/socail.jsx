export default function Social({ links, socailLinks }) {
  let styles = {
    width: "10%",
    marginRight: "5%",
  };
  return (
    <>
      {links.map((e, i) => {
        return (
          <a href={socailLinks[i]}>
            <img src={e} alt="" style={styles} />;
          </a>
        );
      })}
    </>
  );
}
