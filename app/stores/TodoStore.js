import {isPresent} from 'angular2/src/facade/lang';


// Closure
var state = {
  list: [
    {
      id: 'D6835C2B-6DC4-4036-BE04-D7135F55737D',
      content: 'create todo PR',
      completed: false
    },
    {
      id: 'BDEEFCA3-EF7E-413F-9A53-CCFF6B5A6FBB',
      content: 'fix filters',
      completed: true
    },
    {
      id: 'C984C7B7-51B7-476D-B48F-3247871B7678',
      content: 'attend ng-conf',
      completed: false
    }
  ],
  filter: todo => todo,
  currentFilter: 'all',
  editing: null
};

function setState(newState) {
  console.log('SET State');
  Object.assign(state, newState);
  // Emit change
}

export class TodoStore {
  constructor() {
    // console.log('TodoStore');
    this.state = state;
  }

  get list() {
    // Immutable
    return this.state.list.slice(0);
  }
  set list(val) {
    // Immutable
  }

  get count() {
    return this.list.length;
  }
  get remainingCount() {
    return this.list.filter(function(todo) { return !todo.completed; }.bind(this)).length;
  }
  get completedCount() {
    return this.list.filter(function(todo) { return todo.completed; }.bind(this)).length;
  }

  getFilteredList() {
    return this.list.filter(this.state.filter);
  }

  toggleComplete(todo) {
    todo.completed = !todo.completed;
    this.update(todo);
  }

  filterList(func) {
    setState({
      filter: func || this.filter
    });
  }

  editing(todo = null) {
    setState({
      editing: todo
    });
  }

  clearCompleted() {
    var todos = this.list.filter(function(todo) { return !todo.completed; }.bind(this));
    setState({
      list: todos
    });
  }

  toggleAll(isComplete = true) {
    var todos = this.list.map(function(todo) { todo.completed = isComplete; return todo; }.bind(this))
    ;
    setState({
      list: todos
    });
  }

  create(newTodo) {
    var completed = isPresent(newTodo.completed) ? newTodo.completed : false;
    var todo = {
      id: UUID(),
      content: newTodo.content,
      completed: completed,
      created_at: new Date()
    };
    var todos = this.list;
    todos.push(todo);
    setState({
      list: todos
    });
  }

  remove(todo_id) {
    var todos = this.list.filter(function(todo) { return todo.id !== todo_id; }.bind(this));
    setState({
      list: todos
    });
  }

  update(todo) {
    var todos = this.list;
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id && todos[i].id === todo.id) {
        todos[i] = todo;
        break;
      }
    }
    setState({
      list: todos
    });
  }
}

export function UUID() {
  // Otherwise, just use Math.random
  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}
