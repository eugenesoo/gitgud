import React from 'react';
import $ from 'jquery';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      editor: 'sublime',
      tip: ''
    };
  }

  componentDidMount() {
    this.fetchData();
    console.log(window.location.search.slice(7));
  }

  fetchData() {
    $.ajax({
      url: `/users?email=${window.location.search.slice(7)}`,
      method: 'GET',
      success: data => {
        console.log(data);
        this.setState({
          name: data[0].username,
          editor: data[0].texteditor
        });
      },
      failure: error => {
        console.log(error);
      }
    })
  }

  render() {
    return (  
      <div>
        <h3>Hello {this.state.name}!</h3>
        <p>You seem to like using {this.state.editor}, let's get better at it!</p>
        <p>Here's something to work on for today.</p>
      </div> 
    )
  }
}

export default User;