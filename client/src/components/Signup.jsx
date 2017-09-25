import React from 'react';
import $ from 'jquery';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: '',
      editorInput: 'sublime'
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
        window.location.href = data;
      },
      failure: error => {
        console.log(error);
      }
    })
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

      </div> 
    )
  }
}

export default Signup;