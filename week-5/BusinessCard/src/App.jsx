import "./App.css";
import WrapperCard from "./WrapperCard";

let id = 1;

function App() {
  let users = [
    {
      id: 1,
      name: "Ankit",
      des: "I am a developer",
      interest: ["Coding", "Cricket", "Tech Gadgets"],
      socailLinks: [
        "https://linkedin.com/in/ankit-kashyap-coder/",
        "https://twitter.com/Ankitka38153827",
        "https://github.com/Kashyap1ankit",
      ],
    },

    {
      id: 2,
      name: "Sumit",
      des: "I am a aspiring CA",
      interest: ["Accounting", "Cricket", "Podcast"],
      socailLinks: [
        "https://www.linkedin.com/in/sumit-kashyap-a781551b0/",
        "https://twitter.com/SumitKa63453904",
        "https://github.com/Kashyap1ankit",
      ],
    },
  ];

  let links = [
    "https://cdn-icons-png.flaticon.com/128/1377/1377213.png",
    "https://cdn-icons-png.flaticon.com/128/5969/5969020.png",
    "https://cdn-icons-png.flaticon.com/128/5968/5968846.png",
  ];

  return (
    <div className="container">
      {users.map((e) => {
        return (
          <WrapperCard
            key={e.id}
            name={e.name}
            des={e.des}
            interested={e.interest}
            links={links}
            socailLinks={e.socailLinks}
          ></WrapperCard>
        );
      })}
    </div>
  );
}

export default App;
