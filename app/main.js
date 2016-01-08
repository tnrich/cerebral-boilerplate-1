import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'cerebral-router';
import controller from './controller';
import {Container} from 'cerebral-react';

import homeSignals from './modules/Home/signals';
import Home from './modules/Home';
import CerebralForm from './modules/CerebralForm';

const redirectToDefaultColor = ({services}) => {
  services.router.redirect('/blue');
}

controller.signal('rootRouted', [redirectToDefaultColor]);
homeSignals(controller);

//example validation
var validation = {
	email: [function checkEmail(input, state, output) {
		if (input.value.indexOf('@') > -1) {
			output.success()
		} else {
			output.error()
		}
	}],
	myCustom5Validation: [function checkEmail(input, state, output) {
		if (input.value.indexOf('5') > -1) {
			output.success()
		} else {
			output.error()
		}
	}],
}
CerebralForm(controller, validation)

Router(controller, {
  '/': 'rootRouted',
  '/:color': 'colorChanged'
}, {
  onlyHash: true,
  mapper: {
    query: true
  }
});

ReactDOM.render(<Container controller={controller}><Home /></Container>, document.getElementById('root'));
