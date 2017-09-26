import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import User from './components/User.jsx';

ReactDOM.render((<MuiThemeProvider><User /></MuiThemeProvider>), document.getElementById('user'));
