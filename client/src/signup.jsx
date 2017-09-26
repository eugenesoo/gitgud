import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Signup from './components/Signup.jsx';

ReactDOM.render((<MuiThemeProvider><Signup /></MuiThemeProvider>), document.getElementById('signup'));
