import { useContext } from "react";
import { TaskContext } from "../context/TaskProvider";

export default function useTasks(){
    return useContext(TaskContext);
}