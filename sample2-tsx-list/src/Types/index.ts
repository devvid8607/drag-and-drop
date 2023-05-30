export type StatusType='backlog'|'in progress'|'done'

export type TaskType={
    id:string;
    title:string;
    description:string,
    status:StatusType;
}

export type BoardSectionsType={[name:string]:TaskType[]}