import React, { PropTypes } from 'react';
import { Decorator as Cerebral, Link } from 'cerebral-react';
import Title from './components/Title';
import InputWrapper from '../CerebralForm/InputWrapper';

var MyInputComponent = InputWrapper(function MyInputComponent (props) {
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
}, {path: ['my','form','path'], validationName: 'email'})

class Home extends React.Component {
  render() {
    return (
      <div>
        <MyInputComponent/> 
      </div>
    );
  }
}

export default Home;
