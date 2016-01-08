import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './styles.css';

@Cerebral((props) => {
  return {
    input: props.path
  };
})
class InputWrapper extends React.Component {
  onInputChange(value) {
    this.props.signals.UI.inputChanged.sync({
      path: this.props.path,
      value,
      validations: this.props.validations,
      validationError: this.props.validationError
    });
  }
  componentDidMount() {
    this.onInputChange(this.props.input.value);
  }
  render() {
    return (
      <div className={styles.input}>
        <input value={this.props.input.value} onChange={(event) => this.onInputChange(event.target.value)}/>
        {
          this.props.input.error ?
            `Error: ${this.props.input.error}`
          :
            null
        }
      </div>
    );
  }
}

export default InputWrapper;
//HOC component
import {HOC} from 'cerebral-react';
import React, { Component } from "react";
//take in a user component
export default function InputWrapper (ComposedComponent, {path, form, validations, asyncValidation}) {
  //wrap a helper component in cerebral's HOC
  return HOC(class Connector extends Component {
      componentWillMount() {
        this.props.signals.init({path, form})
      }
      componentWillUnmount() {
        this.props.signals.remove({path, form})
      }
      render() {
        var {cerebralInput, ...other} = this.props;
        cerebralInput = cerebralInput || {};
        //prepare the various "bindings"
        var input = {
            onChange: (event) => {
              this.props.signals.change({
                path,
                value: event.target.value,
                validations,
                asyncValidation
              })
            },
            onBlur: (event) => {
              this.props.signals.blur({
                path,
                value: event.target.value,
                validations,
                asyncValidation
              })
            },
            ...cerebralInput
        }
        return <ComposedComponent {...other} {...input} />;
      }
    }, {
    cerebralInput: path,
    //we could also take in other user-defined cerebral bindings here, but it seems like they can just wrap with cerebral like normal if they need to
  })
}