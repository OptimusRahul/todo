import { FC, useEffect } from 'react';
import { useContainer } from 'unstated-next';

import Todo from './Todo/todo';
import TodoContext from '../../contexts/todo.context';

import Loader from '../UI/Loader/loader';
import AddIcon from '../UI/AddIcon/addIcon';

import './todos.scss';

const Todos: FC = (): JSX.Element => {
    const { loading, todos, setChuckNorrisHandler } = useContainer(TodoContext);

    /**
     * 
     * Fetch Chuch Jokes
     * 
     * @description: To fetch and set Chuck Jokes in memory
     * 
     */

    useEffect(() => {
        setChuckNorrisHandler();
    }, []);

    /**
     * @description: Conditional rendering element
     * 
     * @returns Loader | AddIcon | Todo List
     * 
     */

    function renderTodo() {
        // Check if application is in loading
        if(loading) {
            return <Loader />
        } else {
            // Check if todo is empty
            if(todos.length === 0) {
                return <AddIcon />
            }
            // Returns the todo lists
            return todos.map((todo, idx) => <Todo idx={idx} todo={todo} key={todo.id} />)
        }
    }

    /**
     * 
     * @description: Return the todo collection
     * 
     */

    return (
        <div className="todos"> {renderTodo()} </div>
    )
}

export default Todos;