import React from "react";
import arrow from "./image/arrow_up.png";
function Navbar() {
  const handleRoot = () => {
    localStorage.setItem("file_struct", localStorage.getItem("CurrLoc"));
    localStorage.setItem("breadCrums", []);
    window.location.reload();
  };
  return (
    <div className="navbar">
      <div className="arrow">
        <img
          src={arrow}
          style={
            localStorage.getItem("breadCrums") === ""
              ? { opacity: "0.5" }
              : { opacity: "1" }
          }
          alt="back"
          onClick={handleRoot}
        />
      </div>
      <div className="breadcrums">
        <span
          onClick={handleRoot}
          className={
            localStorage.getItem("breadCrums") === "" ? "activeBread" : ""
          }
        >
          root{" "}
        </span>
        {localStorage.getItem("breadCrums").split(",")[0] !== "" &&
          localStorage
            .getItem("breadCrums")
            .split(",")
            .map((item, index) => (
              <React.Fragment key={index}>
                <span className="bread">/</span>{" "}
                <span
                  className={
                    localStorage.getItem("breadCrums") !== ""
                      ? "activeBread"
                      : ""
                  }
                >
                  {item}{" "}
                </span>
              </React.Fragment>
            ))}
      </div>
    </div>
  );
}

export default Navbar;
