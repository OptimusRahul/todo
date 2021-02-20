import { v4 as uuidv4 } from 'uuid';

import { ITodo } from "../types/todo.types";

/**
 * 
 * @param task : string
 * 
 * @description Method to convert task to specific todo object 
 * 
 * @returns { ITodo }
 * 
 */

export const generateTodoObject = (task: string): ITodo => {
    return {
        id: uuidv4(),
        task,
        date: new Date(),
        status: { action: 'PENDING', color: '#fbff0052' },
        priority: "LOW"
    }
}