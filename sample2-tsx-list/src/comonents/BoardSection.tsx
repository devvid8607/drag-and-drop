import React from "react";
import { TaskType } from "../Types";
import { useDroppable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTaskItem from "./SortableTaskItem";
import TaskItem from "./TaskItem";

type BorderSectionProps = {
  id: string;
  title: string;
  tasks: TaskType[];
};

function BoardSection({ id, title, tasks }: BorderSectionProps) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <Box sx={{ backgroundColor: "#eee", padding: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {tasks.map((task) => (
            <Box key={task.id} sx={{ mb: 2 }}>
              <SortableTaskItem id={task.id}>
                <TaskItem task={task} />
              </SortableTaskItem>
            </Box>
          ))}
        </div>
      </SortableContext>
    </Box>
  );
}

export default BoardSection;
