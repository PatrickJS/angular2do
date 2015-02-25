// import {Inject} from 'angular2/di';
// import {Inject, Injector, bind} from 'angular2/di';
// import {string} from 'rtts_assert/rtts_assert';

// new Injector([
//   bind('UUID').toFactory(() => UUID())
// ]);

export function UUID() {
  // Otherwise, just use Math.random
  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}


export class TodoStore {
  constructor() {
    this.state = {
      todos: [
        {
          id: 'D6835C2B-6DC4-4036-BE04-D7135F55737D',
          content: 'create todo PR',
          completed: false
        },
        {
          id: 'BDEEFCA3-EF7E-413F-9A53-CCFF6B5A6FBB',
          content: 'fix filters',
          completed: false
        },
        {
          id: 'C984C7B7-51B7-476D-B48F-3247871B7678',
          content: 'attend meetup',
          completed: false
        }
      ],
      filter: 'all',
      remainingCount: 0,
      completedCount: 0,
      edit: null,
      loaded: false
    };
    // this.filter(location.hash.replace('#/', '') || 'all');
    // this.state.filter = location.hash.replace('#/', '') || this.state.filter;
  }

  filter() {


  }

  get() {
    return this.state;
  }

  set() {

  }

  create(todo) {
    this.state.todos.push({
      id: UUID(),
      content: todo.content,
      completed: false
    });
  }

  find() {

  }

  update() {
    // this.state.todos.filter(id => id === todoId);
  }
}

