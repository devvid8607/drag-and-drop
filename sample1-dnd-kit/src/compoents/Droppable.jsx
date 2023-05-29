import { useDroppable } from "@dnd-kit/core";
import React from "react";

/*
isOver: a boolean value indicating whether the draggable component is currently over the droppable component
setNodeRef: a function that is used to set a reference to the DOM node of the component
*/
/*
DragOverlay component to improve the user experience with a smoother look 
The package ships with useful modifiers that can be used to change the behavior of core components.

Here are some of the key features of modifiers:

Restrict motion to a single axis (horizontal or vertical)
Restrict motion to a window or the parent element of a draggable item
Snap draggable items to a grid
Create custom modifiers

The dnd-kit toolkit ships with a sortable preset. This preset can be used to build sortable drag-and-drop interfaces in React.
*/
const Droppable = (props) => {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
  const style = { color: isOver ? "blue" : undefined };
  return (
    <div style={style} ref={setNodeRef}>
      {props.children}
    </div>
  );
};

export default Droppable;
