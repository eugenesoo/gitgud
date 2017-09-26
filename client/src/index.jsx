import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './components/App.jsx';

const muiTheme = getMuiTheme({
  userAgent: 'all'
});

ReactDOM.render((<MuiThemeProvider muiTheme={muiTheme}><App /></MuiThemeProvider>), document.getElementById('app'));
