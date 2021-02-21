import { ChangeEvent, FC, useRef, useState } from 'react';
import { useContainer } from 'unstated-next';

import { generateTodoObject } from '../../../utils';
import TodoContext from '../../../contexts/todo.context';
import './input.scss';

const Input: FC = (): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [ newTask, setNewTask ] = useState<string>();

    const { setTodo } = useContainer(TodoContext);

    /**
     * 
     * @param e : ChangeEvent<HTMLInputElement>
     * 
     * @description: Take Input box value and update it to the memory
     * 
     */

    const onInputChangeHandler: Function = (e: ChangeEvent<HTMLInputElement>): void => setNewTask(e.target.value);

    /**
     * 
     * @param e : KeyboardEvent
     * 
     * @description: Check for 'Enter' key to update the new task
     * 
     */
    
    const addNewTodoHandler: Function = (e: KeyboardEvent): void => {
        if(e.key === 'Enter') {
            if(newTask && newTask.trim()) {
                const todo = generateTodoObject(newTask);
                setTodo(todo);
                setNewTask('');
            } else {
                window.alert('Please enter task');
            }
            if(inputRef.current) {
                inputRef.current.value = '';
            }
        }
    }

    return (
        <div className="Input" data-testid="Input--test">
            <input
                ref={inputRef}
                className="Input--box" 
                data-testid="Input--box__test"
                placeholder="Please enter todo here" 
                width="400"
                height="100"
                onKeyDown={(e) => addNewTodoHandler(e)}
                onChange={(e) => onInputChangeHandler(e)}
                defaultValue={""}
                />
        </div>
    )
}

export default Input;