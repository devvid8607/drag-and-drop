import { useRef } from "react";
import { fields } from "./fields";
import "./styles.css";
import { nanoid } from "nanoid";
import { useDraggable } from "@dnd-kit/core";

export function SidebarField(props) {
  const { field, overlay } = props;
  const { title } = field;

  let className = "sidebar-field";
  if (overlay) {
    className += " overlay";
  }

  return <div className={className}>{title}</div>;
}

function DraggableSidebarField(props) {
  const { field, ...rest } = props;
  const id = useRef(nanoid());
  // console.log(id);
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true,
    },
  });
  return (
    <div
      ref={setNodeRef}
      className="sidebar-field"
      {...listeners}
      {...attributes}
    >
      <SidebarField field={field} {...rest} />
    </div>
  );
}

export default function Sidebar(props) {
  const { fieldsRegKey } = props;
  return (
    <div key={fieldsRegKey} className="sidebar">
      {fields.map((f) => (
        <DraggableSidebarField key={f.type} field={f} />
      ))}
    </div>
  );
}
