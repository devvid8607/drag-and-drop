import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableListItem(props) {
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
      <label>{field.title}</label>
    </div>
  );
}

function CanvasComponent(props) {
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
          <SortableListItem key={f.id} id={f.id} field={f} index={i} />
        ))}
      </div>
    </div>
  );
}

export default CanvasComponent;
