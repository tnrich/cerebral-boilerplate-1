import InputWrapper from './InputWrapper';
import each from 'lodash/collection/each';
//the module: 
export default function(controller, simpleValidation, asyncValidation) {
	var validationNames = [];
	Object.keys(asyncValidation).forEach(function(key) {
		validationNames.push(key)
		asyncValidation[key] = [[asyncValidation[key]]]
		asyncValidation['noValidationGiven%%'] = []
		validationNames.push('noValidationGiven%%')
	})
	function doSimpleValidation ({input: {value, errors={}, validations={}},state,output}) {
		each(validations, function (message, key) {
			var valid = simpleValidation[key](value, state)
			if (valid) {
				delete errors[key]
			} else {
				errors[key] = {
					message
				}
			}
		})
		output({errors})
	}

	function setValue({input, state, output}) {
		state.set([...input.path, 'value'], input.value)
		if (state.get([...input.path, 'visited'])) {
			output.shouldValidate()
		} else {
			output.doNotValidate()
		}
	}
	setValue.outputs = ['shouldValidate', 'doNotValidate']

	function chooseAsyncValidationPath({input: {path, asyncValidation='noValidationGiven%%'}, state, output}) {
		//call the user provided validation chain, and add the value to its input
		output[asyncValidation]({
			value: state.get([...path, 'value'])
		})
	}
	chooseAsyncValidationPath.outputs = validationNames;
	var signals = {
		init: [function({input, state}) {
			if (!state.get(input.path)) {
				state.set([...input.path], {
					value: input.defaultValue,
					completed: input.defaultValue ? true : false
				})
			}
		}],
		addToForm: [function({input, state}) {
			state.set(['cerebralForm', input.form, 'paths', input.path.join('%.%')],true)
		}],
		removeFromForm: [function({input, state}) {
			state.unset(['cerebralForm', input.form, 'paths', input.path.join('%.%')]);
		}],
		change: [
			setValue, {
				shouldValidate: [
					doSimpleValidation,
					//tnr: we should probably only do async validation on blur events..
					// chooseAsyncValidationPath,
					// asyncValidation,
					chooseAsyncValidationPath,
					asyncValidation,
					setErrors
				],
				doNotValidate: []
			},
		],
		focus: [],
		blur: [
			makeSurePathIsPresent,
			function({input, state}) {
				state.set([...input.path, 'visited'], true)
			},
			doSimpleValidation,
			chooseAsyncValidationPath,
			asyncValidation,
			setErrors
		]
	}
	attachSignalsToController(signals, controller)
}

function attachSignalsToController(signalsObj, controller) {
	each(signalsObj, function(actionArray, signalName) {
		controller.signal(signalName, actionArray);
	})
}

function makeSurePathIsPresent({input, state, output}) {
	if (!state.get([...input.path])) {
		state.set([...input.path], {});
	}
	output({value: state.get([...input.path, 'value'])})
}

function setErrors({input: {path, asyncError={}, errors={}, asyncValidation=''}, state}) {
	if (Object.keys(asyncError).length > 0) {
		errors[asyncValidation] = asyncError;
	}
	state.set([...path, 'errors'], errors);
	if (Object.keys(errors).length > 0) {
		state.set([...path, 'completed'], false);
		state.set([...path, 'hasError'], true);
	} else {
		state.set([...path, 'completed'], true);
		state.set([...path, 'hasError'], false);
	}
}

export function formCompleted (formName) {
	return function (get) {
	  var inputPaths = get(['cerebralForm',formName,'paths']) || {};
	  var completed = true;
	  Object.keys(inputPaths).some(function(path){
	    var input = get(path.split('%.%'))
	    if (!input.completed) {
	      completed = false;
	      return true;
	    }
	  });
	  return completed;
	}
}

export {InputWrapper};

//InputWrapper/index.js
// export default function InputWrapper (ComposedComponent, options) {


// function handleAsyncValid ({input: {asyncValidation, errors={}},output}) {
// 	delete errors[asyncValidation];
// 	output({errors})
// }
// function handleAsyncInvalid ({input: {asyncValidation, errors={}, message=''},output}) {
// 	errors[asyncValidation] = {
// 		message
// 	}
// 	output({errors})
// }
