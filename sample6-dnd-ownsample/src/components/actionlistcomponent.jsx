import { useRef } from "react";
import { actionListItems } from "../ActionData";
import { List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import { nanoid } from "nanoid";
import { useDraggable } from "@dnd-kit/core";

function DraggableListItem(props) {
  const { actionListItem, ...rest } = props;
  const id = useRef(nanoid());

  //each of these items needs to be draggable
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      actionListItem,
      fromActionList: true,
    },
  });

  return (
    <ListItem
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{ width: 100, height: 25, border: 1, margin: 1, marginLeft: 5 }}
    >
      <ListItemText sx={{ textAlign: "center" }}>
        {actionListItem.title}
      </ListItemText>
    </ListItem>
  );
}

export default function Actionlistcomponent() {
  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Actions
        </ListSubheader>
      }
    >
      {actionListItems.map((a) => (
        <DraggableListItem key={a.id} actionListItem={a} />
      ))}
    </List>
  );
}
