//the module: 
export default function({
	validation
}) {
	var validationNames = Object.keys(validation);

	function updateValue({
		input: {
			path, value
		},
		state
	}) {
		state.set([...path, 'value'], value)
	}

	function startValidation({
		input: {
			path, value, validationName
		},
		state,
		output
	}) {
		state.set([...path, 'value'], value)
		if (state.get(...path, 'visited')) {
			output[validationName]()
		}
	}
	startValidation.output = validationNames;
	return {
		init(controller, name) {},
			signalsSync: {
				changed: [
					updateValue,
					startValidation,
					validation, {
						success: [setValid],
						error: [setInvalid]
					}
				],

				focused: [function({
					input: {
						path,
					},
					state
				}) {
					state.set([...path, 'visited'], true)
				}],
				blurred: [startValidation,
					validation, {
						success: [setValid],
						error: [setInvalid]
					}
				]
			}
	}
}

//example validation
var validation = {
	email: [function checkEmail({
		input, output
	}) {
		if (input.value.indexOf('@') > -1) {
			output.success()
		} else {
			output.error()
		}
	}],
	myCustom5Validation: [function checkEmail({
		input, output
	}) {
		if (input.value.indexOf('5') > -1) {
			output.success()
		} else {
			output.error()
		}
	}],
}

function setValid({
	input, state
}) {
	state.set([...input.path, 'completed'], true);
}

function setInvalid({
	input, state
}) {
	state.set([...input.path, 'completed'], false);
}
