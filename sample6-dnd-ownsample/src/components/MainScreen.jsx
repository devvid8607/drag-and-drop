import { DndContext } from "@dnd-kit/core";
import React, { useRef, useState } from "react";
import { useImmer } from "use-immer";
import Actionlistcomponent from "./actionlistcomponent";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CanvasComponent from "./canvascomponent";

function getClickedData(prop) {
  return prop?.data?.current ?? {};
}

function MainScreen() {
  const [data, updateData] = useImmer({
    fields: [],
  }); // data in the canvas

  const spacerInsertedRef = useRef();
  const currentDragFieldRef = useRef();
  const [activeActionListField, setActiveActionListField] = useState(); // only for fields from the sidebar
  const [activeCanvasField, setActiveCanvasField] = useState(); // only for fields that are in the form.

  const { fields } = data;
  //   console.log(fields);

  function createSpacer({ id }) {
    return {
      id,
      type: "spacer",
      title: "spacer",
    };
  }

  const handleDragStart = (e) => {
    // console.log(e);
    const { active } = e;
    const activeData = getClickedData(active);
    // console.log(activeData);
    if (activeData.fromActionList) {
      const { actionListItem } = activeData;
      const { type } = actionListItem;
      setActiveActionListField(actionListItem);

      currentDragFieldRef.current = {
        id: active.id,
        type,
        name: `${type}${fields.length + 1}`,
        parent: null,
      };
      //   console.log(currentDragFieldRef.current);
      return;
    }

    const { actionListItem, index } = activeData;
    // console.log(actionListItem + "," + index);
    currentDragFieldRef.current = actionListItem;
    updateData((draft) => {
      console.log(draft);
      draft.fields.splice(index, 1, createSpacer({ id: active.id }));
    });
  };

  const handleDragOver = (e) => {
    const { active, over } = e;
    const activeData = getClickedData(active);

    if (activeData.fromActionList) {
      const overData = getClickedData(over);
      if (!spacerInsertedRef.current) {
        console.log("in if");
        const spacer = createSpacer({
          id: active.id + "-spacer",
        });

        updateData((draft) => {
          if (!draft.fields.length) {
            draft.fields.push(spacer);
          } else {
            const nextIndex =
              overData.index > -1 ? overData.index : draft.fields.length;

            draft.fields.splice(nextIndex, 0, spacer);
          }
          spacerInsertedRef.current = true;
        });
      } else if (!over) {
        // This solves the issue where you could have a spacer handing out in the canvas if you drug
        // a sidebar item on and then off
        console.log("in not over");
        updateData((draft) => {
          draft.fields = draft.fields.filter((f) => f.type !== "spacer");
        });
        spacerInsertedRef.current = false;
      } else {
        console.log("in else");
        // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
        // we need to make sure we're updating the spacer position to reflect where our drop will occur.
        // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
        updateData((draft) => {
          const spacerIndex = draft.fields.findIndex(
            (f) => f.id === active.id + "-spacer"
          );

          const nextIndex =
            overData.index > -1 ? overData.index : draft.fields.length - 1;

          if (nextIndex === spacerIndex) {
            return;
          }

          draft.fields = arrayMove(draft.fields, spacerIndex, overData.index);
        });
      }
    }
  };

  const handleDragEnd = (e) => {};

  return (
    <div className="app">
      <div className="content">
        <DndContext
          autoScroll
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <Actionlistcomponent />
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={fields.map((f) => f.id)}
          >
            <CanvasComponent fields={fields} />
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default MainScreen;
