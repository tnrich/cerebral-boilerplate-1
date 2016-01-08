import React, { PropTypes } from 'react';
import { Decorator as Cerebral, Link } from 'cerebral-react';
import Title from './components/Title';
import InputWrapper from '../CerebralForm/InputWrapper';

function MyInputComponent (props) {
  return (
    <div>
      is valid email?
      <br/>
      {props.completed ? 'Yes' : 'No'}
      <br/>
        <input {...props}>
        </input>
    </div>
    );
}

// var NewInput = InputWrapper((<div>Hey</div>), {path: ['uniquePath']})
var MyInputComponent = InputWrapper(MyInputComponent, {path: ['uniquePath2'], validationName: 'email'})

@Cerebral({
  title: ['title'],
  color: ['color']
})
class Home extends React.Component {

  static propTypes = {
    color: PropTypes.string,
    title: PropTypes.string
  };

  render() {
    return (
      <div>
        <Title color={this.props.color}>{this.props.title}</Title>
        <MyInputComponent> 
        </MyInputComponent>  
        {InputWrapper((props) =>( <input {...props}>
                </input>), {path: ['uniquePath']})}

        <button onClick={() => this.props.signals.colorChanged({color: 'red'})}>Red</button>
        {' | '}
        <button onClick={() => this.props.signals.colorChanged({color: 'blue'})}>Blue</button>
      </div>
    );
  }
}

export default Home;
