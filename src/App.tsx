import TodoContext from './contexts/todo.context';
import Todo from './components/Todos/todos'
import Header from './components/Header/header';
import Input from './components/UI/Input/input';
import './App.scss';

function App() {
  return (
    <>
      <TodoContext.Provider>
        <Header />
        <Input />
        <Todo />
      </TodoContext.Provider>
    </>
  );
}

export default App;
