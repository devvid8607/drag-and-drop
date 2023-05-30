import { BoardSectionsType, StatusType, TaskType } from '../Types';
import { BOARD_SECTIONS } from '../constants';
import { getTaskByStatus } from './tasks';

export const initializeBoard = (tasks: TaskType[]) => {
  const boardSections: BoardSectionsType = {};

  Object.keys(BOARD_SECTIONS).forEach((boardSectionKey) => {
    boardSections[boardSectionKey] = getTaskByStatus(
      tasks,
      boardSectionKey as StatusType
    );
  });

  return boardSections;
};

export const findBoardSectionContainer = (
  boardSections: BoardSectionsType,
  id: string
) => {
  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id)
  );
  return container;
};
