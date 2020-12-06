import './App.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const App = () => {
  const todoList = useSelector((state) => state.todoList);
  const [todo, setTodo] = useState('');
  const dispatch = useDispatch();
  const addTodo = (todo) => {
    dispatch({
      type: 'ADD_TODOLIST',
      payload: {
        todo,
      },
    });
  };

  return (
    <div>
      {/* <h1>Hello!{props.name}!</h1> */}
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyUp={(e) => {
          console.log(e.key);
          if (e.key === 'Enter') {
            setTodo('');
            addTodo(todo);
          }
        }}
      />
      <button
        onClick={() => {
          setTodo('');
          addTodo(todo);
        }}
      >
        ADD
      </button>

      <div>
        <ul>
          {todoList.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
