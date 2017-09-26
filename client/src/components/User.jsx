import React from 'react';
import $ from 'jquery';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      editor: 'sublime',
      features: [],
      currentFeature: 1
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
          email: data[0].email,
          editor: data[0].texteditor,
          currentFeature: data[0].currentfeature
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

  updateUser(featureIndex) {
     $.ajax({
      url: `/updateuser`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        email: this.state.email,
        currentFeature: featureIndex
      }),
      success: data => {
        console.log(data);
      },
      failure: error => {
        console.log(error);
      }
    })   
  }

  increaseCurrentFeature() {
    var newFeatureIndex = this.state.currentFeature + 1;
    this.setState({
      currentFeature: newFeatureIndex
    })

    this.updateUser(newFeatureIndex);
  }

  decreaseCurrentFeature() {
    var newFeatureIndex = this.state.currentFeature - 1
    this.setState({
      currentFeature: newFeatureIndex
    })

    this.updateUser(newFeatureIndex);
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
        <button onClick={this.decreaseCurrentFeature.bind(this)}>show previous feature</button>
        <button onClick={this.increaseCurrentFeature.bind(this)}>show next feature</button>
      </div> 
    )
  }
}

export default User;