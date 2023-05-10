import React, { DragEvent } from "react";
import "./App.css";

function App() {
  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const onFileDrop = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();

    console.log(
      "event.dataTransfer =====> ",
      event.dataTransfer?.getData("data")
    );
  };
  return (
    <div className="flex">
      <div className="w-[300px] h-screen bg-[#404040]">
        <div
          className="w-[100px] h-[100px] bg-white"
          draggable="true"
          onDragStart={(event) => {
            event.dataTransfer?.setData("componentType", "testtttt");
          }}
        >
          test
        </div>
      </div>
      <div className="flex-1 bg-green-100 p-[20px]">
        <div
          className="h-full bg-white rounded-[10px]"
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDrop={onFileDrop}
          onClick={() => console.log("event.dataTransfer")}
        ></div>
      </div>
    </div>
  );
}
//testing
export default App;
