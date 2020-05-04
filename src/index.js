import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import axios from 'axios';
import { render } from 'react-dom';
import './style.css';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import { v4 as uuidv4 } from 'uuid';


class App extends Component {
  state = {
    todos: [
      // {
      //   id:  uuidv4(),
      //   title: 'take out trash', 
      //   completed: false
      // },
      // {
      //   id: uuidv4(),
      //   title: 'dinner', 
      //   completed: true
      // },      {
      //   id: uuidv4(),
      //   title: 'breath', 
      //   completed: false
      // }
    ]
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?limit=10')
    .then(res => this.setState({todos: res.data}))
  }
    //Toggle Complete
    markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  //Delete Todo 

delTodo = (id) => {
  axios.delete(`https://jsonplaceholder.typicode.com/todos`,{
    
  })
  this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]})
}

//Add Todo

addTodo = (title) => {
  // const newTodo = {
  //   id: uuidv4(),
  //   title,
  //   completed: false
  // }

  axios.post('https://jsonplaceholder.typicode.com/todos',{
    title,
    completed: false
  })
  .then(res => this.setState({todos: [...this.state.todos, res.data ]})
  );
 // console.log(title);
 
}
  

  render() {
   // console.log(this.state.todos);
    return (
      <Router>
      <div className="container">
        <Header/>
        <Route exact path="/" render={props => (
          <React.Fragment>
           <AddTodo addTodo={this.addTodo}/>
        <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
          </React.Fragment>
        )} />
        <Route path="/about" component={About}/>
       
      </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));
