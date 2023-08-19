import "./App.css";
import Navbar from "./components/Navbar";
import Root from "./components/Root";

function App() {
  if (
    localStorage.length !== 3 ||
    localStorage.getItem("CurrLoc") === null ||
    localStorage.getItem("breadCrums") === null ||
    localStorage.getItem("file_struct") === null
  ) {
    localStorage.setItem(
      "CurrLoc",
      JSON.stringify({
        Apps: {},
        Picture: {},
        Videos: {},
        Docs: {},
        "budget.pdf": {},
        "profile.jpg": {},
        "My Test Folder": {},
        "New Folder": {},
      })
    );
    localStorage.setItem("breadCrums", []);
    localStorage.setItem("file_struct", localStorage.getItem("CurrLoc"));
  }

  return (
    <div className="app">
      <Navbar />
      <Root />
    </div>
  );
}

export default App;
