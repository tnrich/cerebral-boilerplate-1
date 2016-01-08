import React, { PropTypes } from 'react';
import { Decorator as Cerebral, Link } from 'cerebral-react';
import Title from './components/Title';
import {InputWrapper, formCompleted} from '../CerebralForm';
import ObjectInspector from 'react-object-inspector';

var Input1 = InputWrapper(function Input1 (props) {
  return (
    <div>
      <br/>
      <ObjectInspector initialExpandedPaths={['root', 'root.errors']} data={ props } />
      <br/>
        NonGmail Input (async validation enabled)
        <input style={{background: props.hasError?'red':'none'}} {...props}>
        </input>

    </div>
    );
}, {path: ['path'], form: 'form1', asyncValidation: 'isNonGmail', validations:{'isEmail': "Please provide a valid email"}})

var ShowAnotherGroupOfInputs = InputWrapper(function ShowAnotherGroupOfInputs (props) {
  return (
    <div>
    <br/>
      <ObjectInspector initialExpandedPaths={['root', 'root.errors']} data={ props } />
      <br/>
      <radiogroup {...props}>
        <input type="radio" name="showOthers" value="showMore" checked={props.value==="showMore"}/> Show More <br/>
        <input type="radio" name="showOthers" value="showLess" checked={props.value==="showLess"}/> Show Less<br/>
      </radiogroup>
    </div>
    );
}, {path: ['showMore'], defaultValue: 'showLess', form: 'form1'})

var Input2 = InputWrapper(function Input2 (props) {
  return (
    <div>
    <br/>
      <ObjectInspector initialExpandedPaths={['root', 'root.errors']} data={ props } />
      <br/>
      <radiogroup {...props}>
        <input type="radio" name="happy" value="happy" checked={props.value==="happy"}/> Happy <br/>
        <input type="radio" name="happy" value="unhappy" checked={props.value==="unhappy"}/> Unhappy <br/>
        <input type="radio" name="happy" value="other" checked={props.value==="other"}/> Other
      </radiogroup>
    </div>
    );
}, {path: ['path4'], form: 'form1'})

var Input3 = InputWrapper(function Input3 (props) {
  return (
    <div>
      <br/>
      <ObjectInspector initialExpandedPaths={['root', 'root.errors']} data={ props } />
      <br/>
    <select {...props}>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="opel">Opel</option>
      <option value="audi">Audi</option>
    </select>
  
    </div>
    );
}, {path: ['path3'], form: 'form1', defaultValue: 'audi', validationName: 'email'})

import each from 'lodash/collection/each';

@Cerebral({showMore: ['showMore'], formCompleted: formCompleted('form1')})
class Home extends React.Component {
  render() {
    var showMore = this.props.showMore && (this.props.showMore.value === 'showMore')
    return (
      <div>
        <Input1/> 
        <br/>
        <ShowAnotherGroupOfInputs/> 
        { showMore
           &&
          <div>
          <Input2/>
          <br/>
          <Input3/>
          </div>
        }
        <button disabled={!this.props.formCompleted}>Submit</button>
        <ObjectInspector initialExpandedPaths={['root', 'root.errors']} data={ this.props } />
      </div>
    );
  }
}

export default Home;
