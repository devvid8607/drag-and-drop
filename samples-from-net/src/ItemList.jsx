import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ItemList = () => {
  const [items, setItems] = useState([
    { id: "item1", content: "Item 1" },
    { id: "item2", content: "Item 2" },
    { id: "item3", content: "Item 3" },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const draggedItemId = active.id;

    if (over.id === "canvas") {
      setItems((prevItems) => {
        const draggedItem = prevItems.find((item) => item.id === draggedItemId);

        if (draggedItem) {
          return [...prevItems, { ...draggedItem }];
        }

        return prevItems;
      });
    } else {
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== draggedItemId)
      );
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="item-list">
        {items.map((item) => (
          <Item key={item.id} id={item.id}>
            {item.content}
          </Item>
        ))}
      </div>
      <SortableCanvas items={items} />
    </DndContext>
  );
};

const Item = ({ id, children }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const SortableCanvas = ({ items }) => {
  return (
    <SortableContext items={items.map((item) => item.id)}>
      <div
        className="canvas"
        style={{ minHeight: "200px", border: "1px solid black" }}
      >
        {items.map((item, index) => (
          <SortableItem key={item.id} id={item.id} index={index}>
            {item.content}
          </SortableItem>
        ))}
        <DragOverlay>
          {items.map((item) => (
            <SortableItem
              key={`dragged-${item.id}`}
              id={`dragged-${item.id}`}
              index={-1}
            >
              {item.content}
            </SortableItem>
          ))}
        </DragOverlay>
      </div>
    </SortableContext>
  );
};

const SortableItem = ({ id, index, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default ItemList;
