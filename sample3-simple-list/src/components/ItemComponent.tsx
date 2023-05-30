import { ItemProp } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function ItemComponent({ id, name }: ItemProp) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    border: "2px solid black",
    marginBottom: 5,
    marginTop: 5,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div>
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        {name}
      </div>
    </div>
  );
}

export default ItemComponent;
