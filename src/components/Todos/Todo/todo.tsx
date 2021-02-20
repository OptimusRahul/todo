import { FC, useEffect, useRef, useState } from "react"
import { useContainer } from 'unstated-next';

import { ITodo } from "../../../types/todo.types";
import TodoContext from '../../../contexts/todo.context';

import EditIcon from '../../../assets/icons/edit.svg';
import TrashIcon from '../../../assets/icons/trash.svg';
import SaveIcon from '../../../assets/icons/save.svg';
import CancelIcon from '../../../assets/icons/cancel.svg';

import '../todos.scss';

interface IProps {
    idx:number,
    todo: ITodo
}

const Todo: FC<IProps> = ( {idx, todo}: IProps ): JSX.Element => {
    const [ edit, setEdit ] = useState(false);
    const [ updateTask, setUpdateTask ] = useState<string>('');
    
    const inputRef = useRef<HTMLInputElement>(null);
    const { id, task, status: { action, color } } = todo;
            
    const { updateTodo, deleteTodo } = useContainer(TodoContext);

    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus();
        }
    }, [edit]);

    /**
     * 
     * @description: Method to get an input field to edit todo
     * 
    */

    const setInputHandler = ():void => setEdit(!edit);

    /**
     * 
     * @description: Method to update the todo on enter key press
     * 
    */


    const setUpdatedTodo = (idx:number, e: any, option:string):void => {
        if(option === 'Button' || (option === 'Keyboard' && e.key === 'Enter')) {
            setInputHandler();
            if(updateTodo) updateTodo(idx, 'TASK_UPDATE', updateTask);
        } else {
            setUpdateTask(e.target.value);
        }
    }

    /**
     *
     * Method to set status of todo
     * 
     * @description: Todos can be marked as 'COMPLETED', 'PENDING'
     *
    */
    const setTodoStatus = (idx: number):void => updateTodo(idx, 'STATUS_UPDATE', '');


    /**
     * 
     * @param idx ; index of the todo
     * @param task : task
     * 
     * @description: Method conditionally renders the todo
     * 
     */

    function renderTask(idx: number, task: string) {
        if(!edit) {
            if(action === 'COMPLETED') {
                // Return if todo has been marked completed
                return (
                    <p> <del> { task } </del> </p>
                )
            }
            // Return if todo is yet to be completed
            return ( 
                <p> { task } </p>
            )
        }

        // Return if todo needs to be edited
        return <input
                    ref={inputRef}
                    className="todo__body--content__edit" 
                    type="text" defaultValue={task} 
                    onChange={(e) => setUpdatedTodo(idx, e, '')} 
                    onKeyPress={(e) => setUpdatedTodo(idx, e, 'Keyboard')}/>
    }

    /**
     * 
     *@description: Return the rendering todo
     * 
     */

    return (
        <div className="todo" key={id} style={{ border: `2px solid ${color}`, background: `linear-gradient(to left, #fff, ${color})`}}>
            <div className="todo__body">
                <div className="todo__body--idx">
                    {idx + 1}
                </div>
                <div className="todo__body--complete">
                    <input type="checkbox" onClick={() => setTodoStatus(idx)}/>
                </div>
                <div className="todo__body--content">
                    {renderTask(idx, task)}
                </div>
            </div>
            <div className="todo--controlBtn">
                <div className="todo--controlBtn__editBtn">
                    {
                        !edit ?
                            <img src={EditIcon} alt='' onClick={setInputHandler}/> :
                            <img src={SaveIcon} alt='' onClick={(e) => setUpdatedTodo(idx, e, 'Button')}/>
                    }
                </div>
                <div className="todo--controlBtn__delBtn">
                    {
                        !edit ? 
                            <img src={TrashIcon} alt='' onClick={() => deleteTodo(idx)}/> :
                            <img src={CancelIcon} alt='' onClick={setInputHandler}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo;