import { Card, CardContent } from "@mui/material";
import { TaskType } from "../Types";

type TaskItemProps = {
  task: TaskType;
};

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <Card>
      <CardContent>{task.title}</CardContent>
    </Card>
  );
};

export default TaskItem;
