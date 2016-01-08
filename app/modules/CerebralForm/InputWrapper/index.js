//HOC component
import {HOC} from 'cerebral-react';
import React, { Component } from "react";
//take in a user component
export default function InputWrapper (ComposedComponent, {path, validationName, validationErrors}) {
  //wrap a helper component in cerebral's HOC
  // var CerebralWrappedComponent = HOC(ComposedComponent, {})
  // return CerebralWrappedComponent;
  // debugger;
  return HOC(class Connector extends Component {
      // componentWillMount() {
      //   this.props.signals.init({path})
      // }
      render() {
        var cerebralInput = this.props.cerebralInput || {};
        //prepare the various "bindings"
        var input = {
            onChange: (event) => {
              this.props.signals.changed({
                path,
                value: event.target.value,
                validationName
              })
            },
            onBlur: () => {
              this.props.signals.blurred({
                path,
                validationName
              })
            },
            ...cerebralInput
            // onFocus: () => {
            //   debugger;
            //   this.props.signals.focused({
            //     path,
            //     validationName
            //   })
            // },
            // value: cerebralInput.value,
            // com
            // data: cerebralInput,
            // errors: cerebralInput.errors
        }
        return <ComposedComponent {...this.props} {...input} />;
      }
    }, {
    cerebralInput: path,
    //we could also take in other user-defined cerebral bindings here, but it seems like they can just wrap with cerebral like normal if they need to
  })
}