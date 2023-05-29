import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { useState } from "react";
import React from "react";

const DndContextCode = () => {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>
      <div className="drag_item">Drag me</div>
    </Draggable>
  );
  function handleDragEnd(event) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="section">
        <div className="draggable">{isDropped ? null : draggableMarkup}</div>
        <div className="draggable">
          <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
        </div>
      </div>
    </DndContext>
  );
};

export default DndContextCode;
