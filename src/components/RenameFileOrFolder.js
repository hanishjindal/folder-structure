import React from "react";
import cross from "./image/close.png";

function RenameFileOrFolder({
  changeName,
  handleChangeName,
  renameFile,
  handleShowRename,
  error,
}) {
  return (
    <div className="add_item">
      <div className="add_box">
        <img src={cross} alt="" onClick={handleShowRename} />
        <div className="add_title" style={{ marginBottom: "30px" }}>
          Rename
        </div>
        <input
          type="text"
          className={error ? "input_name input_error" : "input_name"}
          id="input_name"
          value={changeName}
          onChange={handleChangeName}
        />
        {error && <div className="error">File / Folder already exists!</div>}
        <button className="create" onClick={renameFile}>
          Rename
        </button>
      </div>
    </div>
  );
}

export default RenameFileOrFolder;
