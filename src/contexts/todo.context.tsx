import { useState } from 'react';
import { createContainer } from 'unstated-next';

import { generateTodoObject } from '../utils';
import { fetchChuckNorris } from '../api';
import { ITodo, TODO_UPDATE_OPTION } from '../types/todo.types';

interface ITodoContext {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    todos: ITodo[];
    setTodo: (todo: ITodo) => void;
    deleteTodo: (idx: number) => void;
    updateTodo: (idx:number, option: TODO_UPDATE_OPTION, updatedTask:string) => void;
    setChuckNorris: () => void;
}

const useTodoContext = (): ITodoContext => {
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ todos, setTodos ] = useState<Array<ITodo>>([]);

    /**
     * 
     * @param newTodo: { ITodo }
     * 
     * @description Method to add new todo to the todo collection in memory
     * 
     */

    const setTodo = (newTodo?: ITodo): void => newTodo && setTodos([...todos, newTodo]);

    /**
     * 
     * @param idx : index of the todo to be deleted
     * 
     * @description Method to delete the todo from the collection
     * 
     */

    const deleteTodo = (idx: number): void => {
        todos.splice(idx, 1);
        setTodos([...todos]);
    }

    /**
     * 
     * @param idx : index of the todo
     * @param option : option to perform specific operation ( Task Update, Status Update)
     * @param updatedTask : updated task to set it to the old todo
     * 
     * @description Method to update the todo
     * 
     */

    const updateTodo = (idx:number, option: TODO_UPDATE_OPTION, updatedTask:string) : void => {
        switch(option) {
            // Updating the old task with the new task
            case 'TASK_UPDATE':
                todos[idx].task = updatedTask;
                setTodos([...todos]);
                break;

            // Marking todo as completed or pending
            case 'STATUS_UPDATE':
                const { action } = todos[idx].status;
                if(action === 'COMPLETED') {
                    todos[idx].status.action = 'PENDING';
                    todos[idx].status.color = '#fbff0052';
                    
                } else {
                    todos[idx].status.action = 'COMPLETED';
                    todos[idx].status.color = '#00ff1f52';
                }
                setTodos([...todos]);
        }
    }

    /**
     * 
     * @description Method to fetch Chuck jokes from api and set in memory of application
     * 
     * @returns { Promise<void> }
     * 
     */

    const setChuckNorris = async(): Promise<void> => {
        try {
            const apiPromise: Promise<any>[] = [];            

            // Array used to call CHUCK_NORRIS_API 3 times
            [1, 2, 3].forEach(() => apiPromise.push(fetchChuckNorris()));
            const apiData = await Promise.all(apiPromise)

            const chuckNorrisData: Array<ITodo> = apiData.map(chuckNorris => {
                const { data: { value } } = chuckNorris;
                return {...generateTodoObject(value)};
            });

            setLoading(false);
            setTodos([...todos, ...chuckNorrisData]);
        } catch(error) {
            throw new Error(error);
        }
    }

    return {
        loading,
        setLoading,
        todos,
        setTodo,
        deleteTodo,
        updateTodo,
        setChuckNorris
    };
}

const TodoContext = createContainer(useTodoContext);

export default TodoContext;