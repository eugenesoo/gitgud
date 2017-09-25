import React from 'react';
import $ from 'jquery';

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
  
  updateEditorInput(event) {
    this.setState({
      editorInput: event.target.value
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
      <div>
        <h3>It seems your not signed up yet...</h3>
        <p>What is your name?</p>
        <input placeholder='I am ...' value={this.state.nameInput} onChange={this.updateNameInput.bind(this)}></input>
        <p>Which code editor do you use?</p>
        <select value={this.state.editorInput} onChange={this.updateEditorInput.bind(this)}>
          <option value="sublime">Sublime Text</option>
          <option value="atom">Atom</option>
          <option value="vim">Vim</option>
        </select>
        <br />
        <br />
        <button onClick={this.signUp.bind(this)}>I'm ready to git gud!</button>
        {
          this.state.alreadyExists ? <p> i'm sorry! it seems like this email already exists! please <a href={`/?email=${window.location.search.slice(7)}`}>log in</a> instead :) </p> : <p></p>
        }
        {
          this.state.error ? <p> i'm sorry! we cannot detect your email address! please <a href='/'>go back one page</a> and try again :) </p> : <p></p>
        }
      </div> 
    )
  }
}

export default Signup;