import { StatusType, TaskType } from "../Types";

export const getTaskByStatus=(tasks:TaskType[],status:StatusType)=>{
    return tasks.filter((task)=>task.status===status)
}

export const getTaskByID=(tasks:TaskType[],id:number)=>{
    return tasks.filter((task)=>task.id===id)
}