import {Component, TemplateConfig, NgElement} from 'angular2/angular2';

import {TodoHeader} from 'components/todo-header/todo-header.js';
import {TodoMain} from 'components/todo-main/todo-main.js';
import {TodoFooter} from 'components/todo-footer/todo-footer.js';

import {Style} from 'decorators/style.js';


@Component({
  selector: 'todo-app',
  template: new TemplateConfig({
    url: 'app/components/todo-app/todo-app.html',
    directives: [
      TodoHeader,
      TodoMain,
      TodoFooter,
      Style
    ]
  })
})
export class TodoApp {

  constructor() {
    // TODO: refactor into TodoStorage service
    this.styles = {
      title: {
        height: '130px',
        margin: '0',
        lineHeight: '1.4em',
        width: '100%',
        fontSize: '100px',
        fontWeight: '100',
        textAlign: 'center',
        color: 'rgba(175, 47, 47, 0.15)',
        textRendering: 'optimizeLegibility'
      },
      section: {
        background: '#fff',
        margin: '0 0 40px 0',
        position: 'relative',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'
      },
      footer: {
        margin: '65px auto 0',
        color: '#bfbfbf',
        fontSize: '10px',
        textShadow: '0 1px 0 rgba(255, 255, 255, 0.5)',
        textAlign: 'center'
      }
    }; // end styles

  }

}


