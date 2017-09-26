import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App.jsx';


ReactDOM.render((<MuiThemeProvider><App /></MuiThemeProvider>), document.getElementById('app'));
