import React, { useState } from "react";
import {
  ReactFlowProvider,
  addEdge,
  removeElements,
} from "react-flow-renderer";
import { ReactFlow } from "react-flow-renderer/dist/react-flow-renderer.js";
import "./App.css";

// Rest of the code...

// Rest of the code...

// Rest of the code...

const initialElements = [
  { id: "1", data: { label: "Node 1" }, position: { x: 0, y: 0 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 200, y: 0 } },
  { id: "3", data: { label: "Node 3" }, position: { x: 400, y: 0 } },
];

const App = () => {
  const [elements, setElements] = useState(initialElements);

  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => els.filter((el) => !elementsToRemove.includes(el)));

  return (
    <div className="App">
      <h1>Drag and Drop Demo</h1>
      <div className="react-flow-wrapper">
        <ReactFlowProvider>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default App;
