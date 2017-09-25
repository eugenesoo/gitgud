import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: ''
    };
  }


  updateNameInput(event) {
    this.setState({
      nameInput: event.target.value
    })
  }

  sendName(event) {
    $.ajax({
      url: '/username',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({username: this.state.nameInput}),
      success: data => {
        console.log(data);
      },
      failure: error => {
        console.log(error);
      }
    })
  }

  render() {
    return (  
      <div>
        <h3>Hello!</h3>
        <p>What is your name?</p>
        <input placeholder='Your name please!' onChange={this.updateNameInput.bind(this)}></input>
        <button onClick={this.sendName.bind(this)}>Hello Computer!</button>
      </div> 
    )
  }
}


export default App;