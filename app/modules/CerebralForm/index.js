import each from 'lodash/collection/each';
//the module: 
export default function(controller, validation) {
	var validationNames = [];
	Object.keys(validation).forEach(function(key){
		validationNames.push(key)
		validation[key] = [...validation[key], {success: [setValid],
				error: [setInvalid]}]
	});;

	function updateValue(input, state, output) {
		state.set([...input.path, 'value'], input.value)
		if (state.get(...input.path, 'visited')) {
			output.shouldValidate()
		} else {
			output.doNotValidate()
		}
	}
	updateValue.outputs=['shouldValidate','doNotValidate']

	function startValidation(input, state, output) {
		//call the user provided validation chain, and add the value to its input
		output[input.validationName]({value: state.get([...input.path, 'value'])})
	}

	function checkVisited(input, state, output) {

	}
	startValidation.outputs = validationNames;
	var signals = {
		// init: [initializeInput]
		changed: [
			updateValue, {
				shouldValidate: [
					startValidation,
					validation
				],
				doNotValidate: []
			}
		],

		focused: [],
		blurred: [
			makeSurePathIsPresent,
			function(input, state) {
				state.set([...input.path, 'visited'], true)
			},
			startValidation,
			validation
		]
	}
	attachSignalsToController(signals, controller)
}

function attachSignalsToController(signalsObj, controller) {
	each(signalsObj, function(actionArray, signalName) {
		controller.signal(signalName, actionArray);
	})
}



// function initializeInput(input, state) {
// 	state.set([...input.path, 'completed'], false);
// }

function makeSurePathIsPresent(input, state) {
	if (!state.get([...input.path])) {
		state.set([...input.path], {});
	}
}

function setValid(input, state) {
	state.set([...input.path, 'completed'], true);
	state.set([...input.path, 'hasError'], false);
}

function setInvalid(input, state) {
	state.set([...input.path, 'completed'], false);
	state.set([...input.path, 'hasError'], true);
}