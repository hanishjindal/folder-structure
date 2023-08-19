import React, { useState } from "react";
import Folder from "./Folder";
import File from "./File";
import new_item_img from "./image/add_new_button.png";
import cross from "./image/close.png";

function Root() {
  const [addItem, setAddItem] = useState(false);
  const [switch_btn, setSwitch_btn] = useState(true);
  const [error, setError] = useState(false);
  const [new_file_name, setNew_file_name] = useState("");
  const [file_struct, setFile_struct] = useState(
    Object.keys(JSON.parse(localStorage.getItem("file_struct")))
  );
  const handleUpdateBreadCrums = () => {
    for (let i of localStorage.getItem("breadCrums").split(",")) {
      setFile_struct(
        Object.keys(JSON.parse(localStorage.getItem("file_struct"))[i])
      );
      localStorage.setItem(
        "file_struct",
        JSON.stringify(JSON.parse(localStorage.getItem("file_struct"))[i])
      );
    }
    window.location.reload();
  };
  const addFile = () => {
    let temp_file = JSON.parse(localStorage.getItem("file_struct"));
    if (file_struct.findIndex((item) => item === new_file_name) !== -1) {
      setError(true);
    } else {
      if (file_struct[0] === "") {
        temp_file = {};
      }
      if (new_file_name !== "") {
        temp_file[new_file_name] = {};
        setNew_file_name("");
        setAddItem(false);
        setError(false);
        localStorage.setItem("file_struct", JSON.stringify(temp_file));
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
      }
    }
  };
  return (
    <div className="root_folder">
      {file_struct[0] !== "" &&
        file_struct.map((item, index) => (
          <React.Fragment key={index}>
            {item.split(".").length === 1 ? (
              <Folder
                name={item}
                id={index}
                handleUpdateBreadCrums={handleUpdateBreadCrums}
                error={error}
              />
            ) : (
              <File name={item} id={index} />
            )}
          </React.Fragment>
        ))}
      <div className="new_item">
        <img
          src={new_item_img}
          alt="add new"
          onClick={() => {
            setAddItem(true);
          }}
        />
      </div>
      {addItem && (
        <div className="add_item">
          <div className="add_box">
            <img
              src={cross}
              alt=""
              onClick={() => {
                setAddItem(false);
                setError(false);
                setNew_file_name("");
              }}
            />
            <div className="add_title">Create new</div>
            <div className="switch">
              <button
                className={switch_btn ? "file_btn active" : "file_btn"}
                onClick={() => setSwitch_btn(true)}
              >
                File
              </button>
              <button
                className={!switch_btn ? "folder_btn active" : "folder_btn "}
                onClick={() => setSwitch_btn(false)}
              >
                Folder
              </button>
            </div>
            <input
              type="text"
              className={error ? "input_name input_error" : "input_name"}
              id="input_name"
              value={new_file_name}
              onChange={(e) => {
                setNew_file_name(e.target.value);
              }}
            />
            {error && (
              <div className="error">File / Folder already exists!</div>
            )}
            <button className="create" onClick={addFile}>
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Root;
