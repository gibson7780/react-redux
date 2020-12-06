import './App.css';
import { useState } from 'react';
const App = (props) => {
  console.log('props', props);
  const [todo, setTodo] = useState('');

  console.log(process.env.NODE_ENV);
  console.log('props.todoList', props.todoList);
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
            props.addTodo(todo);
          }
        }}
      />
      <button
        onClick={() => {
          setTodo('');
          props.addTodo(todo);
        }}
      >
        ADD
      </button>

      <div>
        <ul>
          {props.todoList?.map((todo, index) => (
            <li key={index}>{todo.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
