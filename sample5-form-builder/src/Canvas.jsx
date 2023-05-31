import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { renderers } from "./fields";

function getRenderer(type) {
  if (type === "spacer") {
    return () => {
      return <div className="spacer">spacer</div>;
    };
  }

  return renderers[type] || (() => <div>No renderer found for {type}</div>);
}

export function Field(props) {
  const { field, overlay, ...rest } = props;
  const { type } = field;

  const Component = getRenderer(type);

  let className = "canvas-field";
  if (overlay) {
    className += " overlay";
  }

  return (
    <div className={className}>
      <Component {...rest} />
    </div>
  );
}

function SortableField(props) {
  const { id, index, field } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        index,
        id,
        field,
      },
    });

  const style = {
    // transform: transform ? CSS.Transform.toString(transform) : "",
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {/* <Field field={field} /> */}
      <label>{field.type}</label>
    </div>
  );
}

function Canvas(props) {
  const { fields } = props;

  const { listeners, setNodeRef, transform, transition } = useDroppable({
    id: "canvas_droppable",
    data: {
      parent: null,
      isContainer: true,
    },
  });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : "",
    transition,
  };

  return (
    <div ref={setNodeRef} className="canvas" style={style} {...listeners}>
      <div className="canvas-fields">
        {fields?.map((f, i) => (
          <SortableField key={f.id} id={f.id} field={f} index={i} />
        ))}
      </div>
    </div>
  );
}

export default Canvas;
