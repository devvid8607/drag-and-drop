import { Container, Grid } from "@mui/material";
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
} from "@dnd-kit/core";
import { INITIAL_TASKS } from "../data";
import { initializeBoard } from "../utils/board";
import { useState } from "react";
import { BoardSectionsType } from "../Types";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import BoardSection from "./BoardSection";

const BoardSectionList = () => {
  const tasks = INITIAL_TASKS;
  const initialBoardSections = initializeBoard(INITIAL_TASKS);
  const [boardSections, setBoradSections] =
    useState<BoardSectionsType>(initialBoardSections);

  console.log(boardSections);

  const [activeTaskID, setActiveTaskId] = useState<string | null>(null);

  //By default, DndContext uses the Pointer and Keyboard sensors.If you'd like to use other sensors, such as the Mouse and Touch sensors instead, initialize those sensors separately with the options you'd like to use using the useSensor hook

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Container>
      <DndContext collisionDetection={closestCorners}>
        <Grid container spacing={4}>
          {Object.keys(boardSections).map((boardSectionKey) => (
            <Grid item xs={4} key={boardSectionKey}>
              <BoardSection
                id={boardSectionKey}
                title={boardSectionKey}
                tasks={boardSections[boardSectionKey]}
              />
            </Grid>
          ))}
        </Grid>
      </DndContext>
    </Container>
  );
};

export default BoardSectionList;
