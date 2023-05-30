import { ItemListProps } from "../types";
import ItemComponent from "./ItemComponent";
import {
  DndContext,
  PointerSensor,
  useSensors,
  useSensor,
  TouchSensor,
  closestCorners,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { ItemProp } from "../types";

const ItemList = () => {
  // const handleDragEnd=(e)=>{console.log(e)}

  const [items, setItems] = useState<ItemProp[]>([
    { id: 1, name: "Save" },
    { id: 2, name: "Execute" },
    { id: 3, name: "Create" },
  ]);

  const handleOnDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleOnDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          style={{
            marginTop: 80,
            marginLeft: 20,
            width: 200,
            textAlign: "center",
          }}
        >
          {items.map(({ id, ...rest }) => (
            <ItemComponent key={id} id={id} {...rest} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ItemList;
