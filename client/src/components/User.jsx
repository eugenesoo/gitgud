import React from 'react';
import $ from 'jquery';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      editor: 'sublime',
      features: []
    };
  }

  componentDidMount() {
    this.fetchData();
    this.fetchFeatures(this.state.editor);
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

  fetchFeatures(editor) {
    $.ajax({
      url: `/feature?editor=${editor}`,
      method: 'GET',
      success: data => {
        this.setState({
          features: data
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
        {
          this.state.features.map(feature => 
            <div>
            <p>Feature Name: {feature.featurename}</p>
            <p>Feature Type: {feature.featuretype}</p>
            <p>Feature Usage1: {feature.usage1}</p>
            <p>Feature Usage2: {feature.usage2}</p>
            <p>Feature Usage3: {feature.usage3}</p>
            <p>Feature Popularity: {feature.popularity}</p>
            </div>
          )
        }
      </div> 
    )
  }
}

export default User;