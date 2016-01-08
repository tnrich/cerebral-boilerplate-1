//HOC component
import {HOC} from 'cerebral-react';
import React, { Component } from "react";
//take in a user component
export default function InputWrapper (ComposedComponent, options) {
  //wrap a helper component in cerebral's HOC
  return HOC(class Connector extends Component {
      componentWillMount() {
        this.props.signals.init(options)
        this.props.signals.addToForm(options)
      }
      componentWillUnmount() {
        this.props.signals.removeFromForm(options)
      }
      render() {
        var {cerebralInput, ...other} = this.props;
        //prepare the various "bindings"
        var additionalProps = {
            onChange: (event) => {
              this.props.signals.change.sync({
                value: event.target.value,
                ...options
              })
            },
            onBlur: (event) => {
              this.props.signals.blur({
                value: event.target.value,
                ...options
              })
              return true
            },
            ...cerebralInput,
        }
        return <ComposedComponent {...other} {...additionalProps} />;
      }
    }, {
    cerebralInput: options.path,
    //we could also take in other user-defined cerebral bindings here, but it seems like they can just wrap with cerebral like normal if they need to
  })
}