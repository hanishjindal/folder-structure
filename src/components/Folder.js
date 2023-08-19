import React, { useEffect, useState } from "react";
import folder_img from "./image/folder.png";
import Options from "./Options";
import RenameFileOrFolder from "./RenameFileOrFolder";

function Folder({ name, id, handleUpdateBreadCrums }) {
  const [showOptions, setShowOptions] = useState(false);
  const [show_rename, setshow_rename] = useState(false);
  const [changeName, setChangeName] = useState("");
  const [error, setError] = useState(false);
  const handleRename = () => {
    setshow_rename(true);
    setChangeName(
      Object.keys(JSON.parse(localStorage.getItem("file_struct")))[id]
    );
  };

  const handleOpenFolder = () => {
    if (localStorage.getItem("breadCrums") === "") {
      localStorage.setItem(
        "breadCrums",
        Object.keys(JSON.parse(localStorage.getItem("file_struct")))[id]
      );
      handleUpdateBreadCrums();
      window.location.reload();
    } else if (localStorage.getItem("breadCrums").split(",").length < 1) {
      const temp = localStorage.getItem("breadCrums").split(",");
      let temp_bread = JSON.parse(localStorage.getItem("file_struct"));
      for (let i = 1; i < temp.length - 1; i++) {
        temp_bread = temp_bread[temp[i]];
      }
      temp.push(Object.keys(temp_bread)[id]);
      localStorage.setItem("breadCrums", temp);
      handleUpdateBreadCrums();
      window.location.reload();
    }
  };

  const handleShowRename = () => {
    setshow_rename(false);
    setError(false);
    setChangeName("");
  };
  const handleChangeName = (e) => {
    setChangeName(e.target.value);
  };
  const renameFile = () => {
    let temp_rename = {};
    if (
      Object.keys(JSON.parse(localStorage.getItem("file_struct"))).findIndex(
        (item) => item === changeName
      ) !== -1
    ) {
      setError(true);
    } else {
      for (let [key, value] of Object.entries(
        JSON.parse(localStorage.getItem("file_struct"))
      )) {
        if (
          key !==
          Object.keys(JSON.parse(localStorage.getItem("file_struct")))[id]
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
    }
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
    <React.Fragment>
      <div
        className={showOptions ? "folder folder_name_options" : "folder"}
        onContextMenu={handleContextMenu}
      >
        <img
          src={folder_img}
          alt="folder"
          draggable="false"
          onDoubleClick={handleOpenFolder}
        />
        <div className="folder_name">{name}</div>
        {showOptions && <Options id={id} handleRename={handleRename} />}
      </div>
      {show_rename && (
        <RenameFileOrFolder
          changeName={changeName}
          handleChangeName={handleChangeName}
          renameFile={renameFile}
          handleShowRename={handleShowRename}
          error={error}
        />
      )}
    </React.Fragment>
  );
}

export default Folder;
