import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Title from './components/Title';
import Input from '../UI/Input';
import InputWrapper from '../CerebralForm/InputWrapper';

@Cerebral({
  title: ['title'],
  color: ['color'],
  todos: ['todos'],
  falcorTodos: ['falcorTodos']
})
class App extends React.Component {
  componentDidMount() {
    this.props.signals.home.mounted();
  }
  render() {
    const signals = this.props.signals.home;

    return (
      <div>
        <Title color={this.props.color}>{this.props.title}</Title>
        <button onClick={() => signals.colorChanged({color: 'red'})}>Red</button>
        {' | '}
        <button onClick={() => signals.colorChanged({color: 'blue'})}>Blue</button>
        <h3>Firebase</h3>
        <ul>
          {this.props.todos.map(todo => <li>{todo.title}</li>)}
        </ul>

        <div>
          {InputWrapper(<input ...{this.props.input}/>, {
            path: ['uniquePath','to','state'],
            validations: {
              email: (value,state) => {
                if (value.indexOf('@') < 0) {
                  return false
                } else {
                  return true
                }
              }
            }, validatonErrors: {
              email: 'not a valid email'
            }
          })}
        </div>
        <h3>Falcor</h3>
        <ul>
          {Object.keys(this.props.falcorTodos).map(id => <li>{this.props.falcorTodos[id].title}</li>)}
        </ul>
        <h3>Input</h3>
        <Input path={['input']} validations="isEmail" validationError="Not a valid email!"/>
      </div>
    );
  }
}

export default App;
