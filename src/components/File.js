import React, { useEffect, useState } from "react";
import file_img from "./image/file.png";
import Options from "./Options";
import RenameFileOrFolder from "./RenameFileOrFolder";

function File({ name, id }) {
  const [showOptions, setShowOptions] = useState(false);
  const [show_rename, setshow_rename] = useState(false);
  const [changeName, setChangeName] = useState("");
  const handleRename = () => {
    setshow_rename(true);
    setChangeName(
      Object.keys(JSON.parse(localStorage.getItem("file_struct")))[id]
    );
  };
  const handleShowRename = () => {
    setshow_rename(false);
  };
  const handleChangeName = (e) => {
    setChangeName(e.target.value);
  };
  const renameFile = () => {
    let temp_rename = {};
    for (let [key, value] of Object.entries(
      JSON.parse(localStorage.getItem("file_struct"))
    )) {
      if (
        key !== Object.keys(JSON.parse(localStorage.getItem("file_struct")))[id]
      ) {
        temp_rename[key] = value;
      } else {
        temp_rename[changeName] = value;
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
    setshow_rename(false);
    window.location.reload();
  };
  useEffect(() => {
    const handleHideOptions = () => {
      setShowOptions(false);
    };
    window.addEventListener("click", handleHideOptions);
  }, []);
  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowOptions(true);
    setTimeout(() => {
      setShowOptions(false);
    }, 2000);
  };
  return (
    <>
      <div
        className={showOptions ? "file folder_name_options" : "file"}
        onContextMenu={handleContextMenu}
      >
        <img src={file_img} alt="file" draggable="false" />
        <div className="syntax">{"." + name.toString().split(".")[1]}</div>
        <div className="file_name">{name}</div>
        {showOptions && <Options id={id} handleRename={handleRename} />}
      </div>
      {show_rename && (
        <RenameFileOrFolder
          changeName={changeName}
          handleChangeName={handleChangeName}
          renameFile={renameFile}
          handleShowRename={handleShowRename}
        />
      )}
    </>
  );
}

export default File;
