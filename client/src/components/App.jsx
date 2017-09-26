import React from 'react';
import $ from 'jquery';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const paperStyle = {
  height: 500,
  width: 500,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const buttonStyle = {
  margin: 12
};

const footerStyle = {
  'font-size': 10
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      editorInput: 'sublime'
    };
  }

  componentDidMount(){
    if (window.location.search.slice(1, 6) === 'email') {
      this.setState({
        emailInput: window.location.search.slice(7)
      })
    };
  }
  updateEmailInput(event) {
    this.setState({
      emailInput: event.target.value
    })
  }

  sendInfo(event) {
    $.ajax({
      url: '/checkusername',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({email: this.state.emailInput}),
      success: data => {
        console.log(data);
        window.location.href= data;
      },
      failure: error => {
        console.log(error);
      }
    })
  }

  render() {
    return (  
      <Paper style={paperStyle} zDepth={1}>
        <br />
        <p>Hello, welcome to</p>
        <h1>gitgud 三三ᕕ( ᐛ )ᕗ</h1>
        <br />
        <br />       
        <p>What is your email address?</p>
        <TextField value={this.state.emailInput} hintText='Your email please!' onChange={this.updateEmailInput.bind(this)} />
        <br />
        <br />        

        <RaisedButton label="Hello Computer!" primary={true} style={buttonStyle} onClick={this.sendInfo.bind(this)} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p style={footerStyle}>made with love at hack reactor  ¯\_(ツ)_/¯</p>
       </Paper> 
    )
  }
}

export default App;