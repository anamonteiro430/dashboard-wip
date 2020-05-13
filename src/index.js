import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.scss';
import './fonts/RobotoSlab-Bold.ttf'
import './fonts/RobotoSlab-Regular.ttf'
import App from './App';

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
