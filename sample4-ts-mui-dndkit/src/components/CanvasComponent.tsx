import { ItemArrayProps, ItemProp } from "../types";
import { DragOverlay, useDroppable } from "@dnd-kit/core";

import { Box } from "@mui/material";

function CanvasComponent({ items }: ItemArrayProps) {
  const { setNodeRef } = useDroppable({ id: "droppable" });
  console.log(items);
  return (
    <div ref={setNodeRef}>
      <Box sx={{ p: 2, minHeight: 200, border: "1px solid #ccc" }}>
        <DragOverlay adjustScale={false}>
          {items.map((item) => (
            <Box
              key={item.id}
              sx={{ p: 1, backgroundColor: "gray", boxShadow: 1 }}
            >
              {item.name}
            </Box>
          ))}
        </DragOverlay>
      </Box>
    </div>
  );
}

export default CanvasComponent;
