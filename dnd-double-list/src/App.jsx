import React, { useRef, useState, useEffect } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  useSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { FiX } from "react-icons/fi";
import "./style.css";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

const itemList = [
  { id: 1, name: "Text Box", type: "textbox", parent: "itemList" },
  { id: 2, name: "Button", type: "button", parent: "itemList" },
  { id: 3, name: "Label", type: "label", parent: "itemList" },
  // Add more items here
];

const itemList2 = [
  { id: 4, name: "Radio", parent: "itemList2" },
  { id: 5, name: "CheckBox", parent: "itemList2" },
  { id: 6, name: "Dropdown", parent: "itemList2" },
  { id: 7, name: "Form", type: "form", parent: "itemList2" },
  // Add more items here
];

const CanvasItem = ({ item, onRemoveItem, hideOnDrag }) => {
  const handleMouseDown = (e) => {
    e.preventDefault();
    // console.log(item.instanceId);
    onRemoveItem(item.instanceId);
  };
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: item.instanceId.toString(),
      data: {
        parent: item.parent,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    margin: "2px",
    padding: "5px",
    opacity: isDragging ? 0.5 : 1,
    boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 255, 0.5)" : "none",
    cursor: isDragging ? "grabbing" : "grab",
  };
  let itemElement = null;

  if (item.type === "textbox") {
    itemElement = <input type="text" />;
  } else if (item.type === "button") {
    itemElement = <button>Button</button>;
  } else if (item.type === "label") {
    itemElement = <label>Label</label>;
  } else if (item.type === "form") {
    itemElement = (
      <form>
        <label htmlFor="fname">First name:</label>
        <br />
        <input type="text" id="fname" name="fname" />
        <br />
        <label htmlFor="lname">Last name:</label>
        <br />
        <input type="text" id="lname" name="lname" />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  } else {
    itemElement = <label>{item.name}</label>;
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {itemElement}
      <button onMouseDown={handleMouseDown}>
        <FiX />
      </button>
    </div>
  );
};

const Canvas = ({ items, onRemoveItem, hideOnDrag }) => {
  return (
    <SortableContext
      items={items.map((item) => item.id.toString())}
      strategy={verticalListSortingStrategy}
    >
      {items.map((item) => (
        <CanvasItem
          key={item.instanceId}
          item={item}
          onRemoveItem={onRemoveItem}
          hideOnDrag={hideOnDrag}
        />
      ))}
    </SortableContext>
  );
};

const ItemList = ({ items }) => {
  const renderItem = (item) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: item.id.toString(),
      data: {
        parent: item.parent.toString(),
      },
    });

    const style = {
      transform: CSS.Translate.toString(transform),
      cursor: "grab",
      border: "1px solid black",
      width: "100px",
      margin: "10px",
      padding: "2px",
    };

    const handleMouseDown = (e) => {
      e.preventDefault();
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        onMouseDown={handleMouseDown}
        {...listeners}
        className="item-list-item"
      >
        {item.name}
      </div>
    );
  };

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} style={{ textAlign: "center" }}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

const Trash = () => {
  const { setNodeRef, isOver } = useDroppable({ id: "trash" });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "280px",
        height: "180px",
        backgroundColor: isOver ? "red" : "green",
      }}
    ></div>
  );
};

const NewCanvas = ({ items, onRemoveItem, hideOnDrag }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "newCanvas" });
  // console.log(items);
  return (
    <div
      ref={setNodeRef}
      style={{
        width: "100%",
        minHeight: "500px",
        backgroundColor: isOver ? "blue" : "wheat",
        display: "flex",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "10px",
      }}
    >
      {/* <Canvas
        items={items}
        onRemoveItem={onRemoveItem}
        hideOnDrag={hideOnDrag}
      /> */}
      <SortableContext
        items={items.map((item) => item.id.toString())}
        strategy={rectSortingStrategy}
      >
        {items.map((item) => (
          <CanvasItem
            key={item.instanceId}
            item={item}
            onRemoveItem={onRemoveItem}
            hideOnDrag={hideOnDrag}
          />
        ))}
      </SortableContext>
    </div>
  );
};

const App = () => {
  const [canvasItems, setCanvasItems] = useState([]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // console.log(canvasItems);
  const [draggedOverTrash, setDraggedOverTrash] = useState(false);

  const addItemToCanvas = (item) => {
    // console.log(item);
    // const newItem = { ...item, instanceId: Date.now() };
    const newItem = { ...item, instanceId: Date.now() };
    setCanvasItems((prevItems) => [...prevItems, newItem]);
  };

  const removeItemFromCanvas = (itemId) => {
    //console.log(itemId);
    setCanvasItems((prevItems) => {
      //  console.log(prevItems);
      return prevItems.filter((item) => item.instanceId !== Number(itemId));
    });
  };

  const handleDrop = (event) => {
    const { active, over } = event;

    // console.log("active");
    // console.log(active);
    // console.log("over");
    // console.log(over);

    if (over?.id === "trash")
      setCanvasItems((items) => {
        return items.filter((item) => item.instanceId !== Number(active?.id));
      });
    if (over?.id === "newCanvas") {
      console.log(over);
      // console.log(active?.data?.current?.parent);
      const listname = active?.data?.current?.parent;
      let arr = [];
      if (listname === "itemList2") {
        arr = itemList2;
      } else arr = itemList;
      const item = arr.find(
        (item) => item.id.toString() === active?.id.toString()
      );

      if (item) {
        addItemToCanvas(item);
      }
    } else if (over?.id !== "trash" && over && active.id !== over?.id) {
      // console.log("moving withing the canvas");

      setCanvasItems((items) => {
        const oldIndex = items.findIndex(
          (item) => item.instanceId === Number(active.id)
        );
        const newIndex = items.findIndex(
          (item) => item.instanceId === Number(over?.id)
        );
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  function handleDragOver(e) {
    const { active, over } = e;
    // console.log(e);
    if (over == null) {
      return;
    }
  }

  const { isOver, setNodeRef } = useDroppable({
    id: "canvas",
  });

  const dropStyle = {
    backgroundColor: isOver ? "lightblue" : "transparent",
    minHeight: "300px", // Set the minimum height for the drop container
  };

  return (
    <div className="container">
      <DndContext onDragEnd={handleDrop} onDragOver={handleDragOver}>
        <div className="side-by-side-container">
          <div className="item-list-container">
            <h2>Item List</h2>
            <ItemList items={itemList} />
          </div>

          <div className="item-list-container">
            <h2>Item List 2</h2>
            <ItemList items={itemList2} />
          </div>

          <div className="trash-container">
            <h1>Trash</h1>
            <Trash items={itemList} />
          </div>
        </div>

        <h1>Canvas</h1>
        <NewCanvas
          items={canvasItems}
          onRemoveItem={removeItemFromCanvas}
          hideOnDrag={draggedOverTrash}
        />
      </DndContext>
    </div>
  );
};

export default App;
