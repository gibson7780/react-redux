import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

// class ConnectTitle extends React.Component {
//   render() {
//     return <h1>Hello!{this.props.name}</h1>;
//   }
// }

const initState = {
  todoList: [],
};

const ADD_TODOLIST = 'ADD_TODOLIST';

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODOLIST:
      return {
        todoList: [...state.todoList, action.payload.todo],
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log('store', store);

const addTodo = (todo) => {
  return {
    type: ADD_TODOLIST,
    payload: {
      todo: todo,
    },
  };
};

const mapStateToProps = (state) => ({
  todoList: state.todoList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (todo) => dispatch(addTodo(todo)),
  };
};

const Title = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <Title />
  </Provider>,
  document.getElementById('root')
);
