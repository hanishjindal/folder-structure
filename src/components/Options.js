import React from "react";

function Options({ id, handleRename }) {
  const handleDelete = () => {
    let temp_rename = {};
    for (let [key, value] of Object.entries(
      JSON.parse(localStorage.getItem("file_struct"))
    )) {
      if (
        key !== Object.keys(JSON.parse(localStorage.getItem("file_struct")))[id]
      ) {
        temp_rename[key] = value;
      }
    }
    localStorage.setItem("file_struct", JSON.stringify(temp_rename));
    let temp_file = JSON.parse(localStorage.getItem("file_struct"));
    if (localStorage.getItem("breadCrums").split(",")[0] === "") {
      localStorage.setItem("CurrLoc", JSON.stringify(temp_file));
    } else if (localStorage.getItem("breadCrums").split(",").length === 1) {
      let temp_root = JSON.parse(localStorage.getItem("CurrLoc"));
      Object.keys(temp_root).forEach((key) => {
        if (key === localStorage.getItem("breadCrums").split(",")[0]) {
          temp_root[key] = JSON.parse(localStorage.getItem("file_struct"));
        }
      });
      localStorage.setItem("CurrLoc", JSON.stringify(temp_root));
    }
    window.location.reload();
  };
  return (
    <div className="options">
      <div id={id} className="rename" onClick={handleRename}>
        Rename
      </div>
      <div id={id} className="delete" onClick={handleDelete}>
        Delete
      </div>
    </div>
  );
}

export default Options;
