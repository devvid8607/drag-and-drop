import { ItemArrayProp } from "../types";
import { ItemProp } from "../types";
import { useState } from "react";
import ListComponent from "./ListComponent";

import { DragOverlay, useDroppable } from "@dnd-kit/core";

import { Box } from "@mui/material";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensors,
  useSensor,
  TouchSensor,
} from "@dnd-kit/core";
import CanvasComponent from "./CanvasComponent";

function MainScreen({ initialItems }: ItemArrayProp) {
  const [canvasItems, setCanvasItems] = useState<ItemProp[]>([]);
  const handleDrop = (event: any) => {
    const { over, active } = event;
    console.log(event);

    if (active && over) {
      const itemId = active.id;
      const item = initialItems.find((item) => item.id === itemId);
      console.log(item);

      if (item) {
        setCanvasItems((prevItems) => [...prevItems, item]);
        console.log(canvasItems);
      }
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDrop}
    >
      <div>
        <h1>List</h1>
        <ListComponent items={initialItems} />
        <h1>Canvas</h1>

        <CanvasComponent items={canvasItems} />
      </div>
    </DndContext>
  );
}

export default MainScreen;
