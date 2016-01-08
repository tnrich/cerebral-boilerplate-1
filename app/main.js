import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'cerebral-router';
import controller from './controller';
import {Container} from 'cerebral-react';

import Home from './modules/Home';
import CerebralForm from './modules/CerebralForm';
import validator from 'validator';

//example validation
var simpleValidation = {
	...validator
}
var asyncValidation = {
	// myAsyncEmailValidation: [function checkEmail({input, output, services}) {
	// 	services.superagent
	// 	.post('/validateEmail')
	// 	.send(input.value)
	// 	.then(function(argument) {
	// 		output.success()
	// 	}).catch(function(err) {
	// 		output.error()
	// 	})
	// }],
	isNonGmail: function({
		input, output
	}) {
		//fake talking to backend
		setTimeout(function(argument) {
			if (input.value.indexOf('gmail') > -1) {
				output({
					asyncError: {
						message: 'The email ' + input.value + ' cannot have gmail in the name'
					}
				})
			} else {
				output()
			}
		}, 300)
	}
}
CerebralForm(controller, simpleValidation, asyncValidation)

ReactDOM.render(<Container controller={controller}><Home /></Container>, document.getElementById('root'));
