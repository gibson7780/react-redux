import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppHook from './AppHook';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { connect, Provider } from 'react-redux';
// class ConnectTitle extends React.Component {
//   render() {
//     return <h1>Hello!{this.props.name}</h1>;
//   }
// }
const loggerMiddleware = createLogger();

const initState = {
  todoList: [],
};

const ADD_TODOLIST = 'ADD_TODOLIST';

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TODOLIST:
      return {
        todoList: [...state.todoList, ...action.payload.todo],
      };
    default:
      return state;
  }
};
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware, // 讓我們來 dispatch() function
    createLogger // 巧妙的 middleware，用來 log action
  )
);
// const store = createStore(reducer);
console.log('store', store);

// normal redux
// const addTodo = (todo) => {
//   return {
//     type: ADD_TODOLIST,
//     payload: {
//       todo,
//     },
//   };
// };

// const mapStateToProps = (state) => ({
//   todoList: state.todoList,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addTodo: (todo) => dispatch(addTodo(todo)),
//   };
// };

// const Title = connect(mapStateToProps, mapDispatchToProps)(App);
const addTodo = (todo) => {
  return {
    type: ADD_TODOLIST,
    payload: {
      todo: todo,
    },
  };
};
const fetchAPI = () => {
  return (dispatch) => {
    return fetch(
      'https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=2'
    )
      .then((res) => res.json())
      .then((res) => {
        console.log('res', res);
        return dispatch({
          type: ADD_TODOLIST,
          payload: {
            todo: res,
          },
        });
      });
  };
};
const fetchAPINeeded = (dispatch, getState) => {
  console.log('getState', getState);
  return {
    addTodo: (todo) => {
      console.log('todo', todo);
      return dispatch(fetchAPI());
    },
  };
};
const mapStateToProps = (state) => ({
  todoList: state.todoList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (todo) => {
      console.log('todo', todo);
      return dispatch(addTodo(todo));
    },
  };
};

// const Title = connect(mapStateToProps, mapDispatchToProps)(App);
const Title = connect(mapStateToProps, fetchAPINeeded)(App);

ReactDOM.render(
  <Provider store={store}>
    {/* <Title /> */}
    <AppHook />
  </Provider>,
  document.getElementById('root')
);
