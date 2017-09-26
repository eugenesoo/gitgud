import React from 'react';
import $ from 'jquery';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const paperStyle = {
  height: 500,
  width: 500,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const selectStyle = {
  textAlign: 'left',
};

const buttonStyle = {
  margin: 12
};

const footerStyle = {
  'font-size': 10
};

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: '',
      editorInput: 'sublime',
      alreadyExists: false,
      error: false
    };
  }


  updateNameInput(event) {
    this.setState({
      nameInput: event.target.value
    })
  }
  
  updateEditorInput(event, index, value) {
    this.setState({
      editorInput: value
    })
  }

  signUp(event) {
    var self = this;
    console.log(window.location.search.slice(1, 6));
    if (window.location.search.slice(1, 6) === 'email') {
      $.ajax({
        url: '/createuser',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          username: this.state.nameInput,
          email: window.location.search.slice(7),
          texteditor: this.state.editorInput
        }),
        success: data => {
          console.log(data);
          if(data === 'error=emailexists') {
            self.setState({
              alreadyExists: true
            })
          } else {
            window.location.href = data;  
          }
        },
        failure: error => {
          console.log(error);
        }
      })
    } else {
      this.setState({
        error: true
      })
    }
  }

  render() {

    return (  
      <Paper style={paperStyle} zDepth={1}>
        <br />
        <h1>(ಥ_ಥ)</h1>
        <h3>It seems you're not signed up yet...</h3>
        <p>What is your name?</p>
        <TextField hintText='I am ...' value={this.state.nameInput} onChange={this.updateNameInput.bind(this)} />
        <br />
        <br />
        <p>Which code editor do you use?</p>
        <SelectField
          style={selectStyle}
          floatingLabelText="Code editor"
          value={this.state.editorInput}
          onChange={this.updateEditorInput.bind(this)}
        >
          <MenuItem value='sublime' primaryText="Sublime Text" />
          <MenuItem value='atom' primaryText="Atom" />
          <MenuItem value='vim' primaryText="Vim" />
        </SelectField>

        <br />
        <br />
        <RaisedButton label="I'm ready to git gud!" primary={true} style={buttonStyle} onClick={this.signUp.bind(this)} />
        {
          this.state.alreadyExists ? <p> i'm sorry! it seems like this email already exists! please <a href={`/?email=${window.location.search.slice(7)}`}>log in</a> instead :) </p> : <p></p>
        }
        {
          this.state.error ? <p> i'm sorry! we cannot detect your email address! please <a href='/'>go back one page</a> and try again :) </p> : <p></p>
        }
        <p style={footerStyle}>made with love at hack reactor  ¯\_(ツ)_/¯</p>
      </Paper>
      
    )
  }
}

export default Signup;