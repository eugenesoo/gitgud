import React from 'react';
import $ from 'jquery';

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
      <div>
        <h3>Hello!</h3>
        <p>What is your email address?</p>
        <input value={this.state.emailInput} placeholder='Your email please!' onChange={this.updateEmailInput.bind(this)}></input>
        <br />
        <br />
        <button onClick={this.sendInfo.bind(this)}>Hello Computer!</button>

      </div> 
    )
  }
}

export default App;