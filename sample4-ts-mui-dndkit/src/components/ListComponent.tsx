import { ItemArrayProps } from "../types";
// import { List } from "@mui/material";
import ListDraggableItem from "./ListDraggableItem";

function ListComponent({ items }: ItemArrayProps) {
  return (
    <div>
      {items.map((item) => (
        <ListDraggableItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ListComponent;
