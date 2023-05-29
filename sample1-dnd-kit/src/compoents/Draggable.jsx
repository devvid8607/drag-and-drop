import { useDraggable } from "@dnd-kit/core";
import React from "react";

/*
attributes: an object containing the HTML attributes required to make the component draggable
listeners: an object containing event listeners that are triggered when the user drags the component
setNodeRef: a function that is used to set a reference to the DOM node of the component
transform: an object that contains the current x and y translation of the component in pixels
*/

const Draggable = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <button ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </button>
  );
};

export default Draggable;
