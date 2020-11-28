import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

class ConnectTitle extends React.Component {
  render() {
    return <h1>Hello!{this.props.name}</h1>;
  }
}

const initState = {
  name: 'Nick',
};
const reducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(reducer);

const mapStateToProps = (state) => ({
  name: state.name,
});

const Title = connect(mapStateToProps)(ConnectTitle);

ReactDOM.render(
  <Provider store={store}>
    <Title />
  </Provider>,
  document.getElementById('root')
);
