//HOC component
import {HOC} from 'cerebral-react';
import { Component } from "react";
//take in a user component
export default function InputWrapper (ComposedComponent, {path, validation, validationErrors}) {
  //wrap a helper component in cerebral's HOC
  // var CerebralWrappedComponent = HOC(ComposedComponent, {})
  // return CerebralWrappedComponent;
  // debugger;
  return HOC(class Connector extends Component {
      render() {
        debugger;
        //prepare the various "bindings"
        var input = {
            onChange: (value) => {
              this.props.signals.changed({
                path,
                value,
                validation
              })
            },
            onBlur: () => {
              this.props.signals.blurred({
                path,
                validation
              })
            },
            onFocus: () => {
              this.props.signals.focus({
                path,
                validation
              })
            },
            value: this.props.cerebralInput.value,
            data: this.props.cerebralInput,
            errors: this.props.cerebralInput.errors
        }
        return <ComposedComponent {...this.props} ...input />;
      }
    }, {
    cerebralInput: path,
    //we could also take in other user-defined cerebral bindings here, but it seems like they can just wrap with cerebral like normal if they need to
  })
}