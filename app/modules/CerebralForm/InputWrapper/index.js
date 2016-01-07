//HOC component
import {HOC} from 'cerebral-react';
import { Component } from "React";
//take in a user component
function InputWrapper (ComposedComponent, {path, validations, validationErrors}) {
  //wrap a helper component in cerebral's HOC
  return HOC(class Connector extends Component {
      render() {
        //prepare the various "bindings"
        var input = {
            onChange: (value) => {
              this.props.signals.changed({
                path,
                value,
                validations
              })
            },
            onBlur: () => {
              this.props.signals.blurred({
                path,
                validations
              })
            }
            onFocus: () => {
              this.props.signals.focus({
                path,
                validations
              })
            }
            value: this.props.cerebralInput.value,
            data: this.props.cerebralInput,
            errors: this.props.cerebralInput.errors
        }
        return <ComposedComponent {...this.props} input={input} />;
      }
    }, {
    cerebralInput: [path],
    //we could also take in other user-defined cerebral bindings here, but it seems like they can just wrap with cerebral like normal if they need to
  })
}