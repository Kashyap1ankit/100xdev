import "./App.css";
import Head from "./Head";
import Desc from "./Desc";
import Interest from "./Interest";

function App() {
  let name = "Ankit";
  let des = "I am a developer";
  let interest = ["Coding", "cricket🏏"];
  return (
    <div className="card">
      <div className="heading">
        <Head name={name} />
        <Desc des={des} />
        <Interest interested={interest} />
      </div>
    </div>
  );
}

export default App;
