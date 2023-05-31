import { useDraggable } from "@dnd-kit/core";
import { DraggableItemProps } from "../types";
import { ListItemText, ListItem } from "@mui/material";

function ListDraggableItem({ item }: DraggableItemProps) {
  const { listeners, setNodeRef, attributes, transform } = useDraggable({
    id: item.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <ListItem ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <ListItemText primary={item.name} />
    </ListItem>
  );
}

export default ListDraggableItem;
