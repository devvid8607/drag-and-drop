// import React, { useState } from "react";
// import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
// import { CSS } from "@dnd-kit/utilities";
// import { FiX } from "react-icons/fi";

// const itemList = [
//   { id: 1, name: "Item 1" },
//   { id: 2, name: "Item 2" },
//   { id: 3, name: "Item 3" },
//   // Add more items here
// ];

// const Canvas = ({ items, onRemoveItem }) => {
//   const removeItem = (itemId) => {
//     onRemoveItem(itemId);
//   };

//   return (
//     <div className="canvas">
//       {items.map((item) => (
//         <div key={item.instanceId} className="canvas-item">
//           <span>{item.name}</span>
//           <button
//             onClick={() => removeItem(item.instanceId)}
//             className="delete-button"
//           >
//             <FiX />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// const ItemList = ({ items }) => {
//   const renderItem = (item) => {
//     const { attributes, listeners, setNodeRef, transform } = useDraggable({
//       id: item.id.toString(),
//     });

//     const style = {
//       transform: CSS.Translate.toString(transform),
//     };

//     return (
//       <div
//         ref={setNodeRef}
//         style={style}
//         {...attributes}
//         {...listeners}
//         className="item-list-item"
//       >
//         {item.name}
//       </div>
//     );
//   };

//   return (
//     <div className="item-list">
//       {items.map((item) => (
//         <div key={item.id}>{renderItem(item)}</div>
//       ))}
//     </div>
//   );
// };

// const App = () => {
//   const [canvasItems, setCanvasItems] = useState([]);

//   const addItemToCanvas = (item) => {
//     const newItem = { ...item, instanceId: Date.now() };
//     setCanvasItems((prevItems) => [...prevItems, newItem]);
//   };

//   const removeItemFromCanvas = (itemId) => {
//     setCanvasItems((prevItems) =>
//       prevItems.filter((item) => item.instanceId !== itemId)
//     );
//   };

//   const handleDrop = (event) => {
//     const item = itemList.find(
//       (item) => item.id.toString() === event.active.id
//     );

//     if (item) {
//       addItemToCanvas(item);
//     }
//   };

//   const { isOver, setNodeRef } = useDroppable({
//     onDrop: handleDrop,
//   });

//   const dropStyle = {
//     backgroundColor: isOver ? "lightblue" : "transparent",
//     minHeight: "200px", // Set the minimum height for the drop container
//   };

//   return (
//     <div className="container">
//       <h1>Canvas</h1>
//       <DndContext onDragEnd={handleDrop} modifiers={[restrictToVerticalAxis]}>
//         <div ref={setNodeRef} style={dropStyle} className="canvas-container">
//           <Canvas items={canvasItems} onRemoveItem={removeItemFromCanvas} />
//         </div>
//         <div className="item-list-container">
//           <h2>Item List</h2>
//           <ItemList items={itemList} />
//         </div>
//       </DndContext>
//     </div>
//   );
// };

// export default App;

// the above code works without the capability of moving the data around in the canvas
// import React, { useState } from "react";
// import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
// import { CSS } from "@dnd-kit/utilities";
// import { FiX } from "react-icons/fi";

// const itemList = [
//   { id: 1, name: "Item 1" },
//   { id: 2, name: "Item 2" },
//   { id: 3, name: "Item 3" },
//   // Add more items here
// ];

// const Canvas = ({ items, onRemoveItem }) => {
//   const removeItem = (itemId) => {
//     onRemoveItem(itemId);
//   };

//   return (
//     <div className="canvas">
//       {items.map((item) => (
//         <div key={item.instanceId} className="canvas-item">
//           <span>{item.name}</span>
//           <button
//             onClick={() => removeItem(item.instanceId)}
//             className="delete-button"
//           >
//             <FiX />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// const ItemList = ({ items }) => {
//   const renderItem = (item) => {
//     const { attributes, listeners, setNodeRef, transform } = useDraggable({
//       id: item.id.toString(),
//     });

//     const style = {
//       transform: CSS.Translate.toString(transform),
//     };

//     return (
//       <div
//         ref={setNodeRef}
//         style={style}
//         {...attributes}
//         {...listeners}
//         className="item-list-item"
//       >
//         {item.name}
//       </div>
//     );
//   };

//   return (
//     <div className="item-list">
//       {items.map((item) => (
//         <div key={item.id}>{renderItem(item)}</div>
//       ))}
//     </div>
//   );
// };

// const App = () => {
//   const [canvasItems, setCanvasItems] = useState([]);

//   const addItemToCanvas = (item) => {
//     const newItem = { ...item, instanceId: Date.now() };
//     setCanvasItems((prevItems) => [...prevItems, newItem]);
//   };

//   const removeItemFromCanvas = (itemId) => {
//     setCanvasItems((prevItems) =>
//       prevItems.filter((item) => item.instanceId !== itemId)
//     );
//   };

//   const handleDrop = (event) => {
//     const item = itemList.find(
//       (item) => item.id.toString() === event.active.id
//     );

//     if (item) {
//       addItemToCanvas(item);
//     }
//   };

//   const { isOver, setNodeRef } = useDroppable({
//     onDrop: handleDrop,
//   });

//   const dropStyle = {
//     backgroundColor: isOver ? "lightblue" : "transparent",
//     minHeight: "200px", // Set the minimum height for the drop container
//   };

//   return (
//     <div className="container">
//       <h1>Canvas</h1>
//       <DndContext onDragEnd={handleDrop} modifiers={[restrictToVerticalAxis]}>
//         <div ref={setNodeRef} style={dropStyle} className="canvas-container">
//           <Canvas items={canvasItems} onRemoveItem={removeItemFromCanvas} />
//         </div>
//         <div className="item-list-container">
//           <h2>Item List</h2>
//           <ItemList items={itemList} />
//         </div>
//       </DndContext>
//     </div>
//   );
// };

// export default App;

// above code works

import React, { useRef, useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
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
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
  // Add more items here
];

const CanvasItem = ({ item, onRemoveItem, hideOnDrag }) => {
  const handleMouseDown = (e) => {
    e.preventDefault();
    onRemoveItem(item.instanceId);
  };
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id: item.instanceId.toString(),
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span>{item.name}</span>
      <button onMouseDown={handleMouseDown}>
        <FiX />
      </button>
    </div>
  );
};

const Canvas = ({ items, onRemoveItem, hideOnDrag }) => {
  return (
    <div className="canvas">
      <SortableContext
        items={items.map((item) => item.instanceId.toString())}
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
    </div>
  );
};

const ItemList = ({ items }) => {
  const renderItem = (item) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: item.id.toString(),
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
    >
      TRASH
    </div>
  );
};

const App = () => {
  const [canvasItems, setCanvasItems] = useState([]);
  //console.log(canvasItems);
  const [draggedOverTrash, setDraggedOverTrash] = useState(false);

  const addItemToCanvas = (item) => {
    const newItem = { ...item, instanceId: Date.now() };
    setCanvasItems((prevItems) => [...prevItems, newItem]);
  };

  const removeItemFromCanvas = (itemId) => {
    //console.log(itemId);
    setCanvasItems((prevItems) =>
      prevItems.filter((item) => item.instanceId !== Number(itemId))
    );
  };

  const handleDrop = (event) => {
    const { active, over } = event;

    console.log("active");
    console.log(active);
    console.log("over");
    console.log(over);

    if (over?.id === "trash")
      setCanvasItems((items) =>
        items.filter((item) => item.instanceId !== Number(active?.id))
      );
    else if (over && active.id !== over?.id) {
      console.log("moving withing the canvas");

      setCanvasItems((items) => {
        const oldIndex = items.findIndex(
          (item) => item.instanceId === Number(active.id)
        );
        const newIndex = items.findIndex(
          (item) => item.instanceId === Number(over?.id)
        );
        return arrayMove(items, oldIndex, newIndex);
      });
    } else {
      const item = itemList.find(
        (item) => item.id.toString() === active?.id.toString()
      );

      if (item) {
        addItemToCanvas(item);
      }
    }
  };

  function handleDragOver(e) {
    const { active, over } = e;

    if (over == null) {
      return;
    }
  }

  const { isOver, setNodeRef } = useDroppable({
    onDrop: handleDrop,
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

          <div className="trash-container">
            <h1>Trash</h1>
            <Trash items={itemList} />
          </div>
        </div>

        <h1>Canvas</h1>
        <div ref={setNodeRef} style={dropStyle} className="canvas-container">
          <Canvas
            items={canvasItems}
            onRemoveItem={removeItemFromCanvas}
            hideOnDrag={draggedOverTrash}
          />
        </div>
      </DndContext>
    </div>
  );
};

export default App;
