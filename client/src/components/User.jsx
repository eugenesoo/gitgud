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
      currentFeature: 0
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
    let feature = null;
    if (this.state.features.length !== 0) {
      feature = (
        <div>
          <p>Feature Name: {this.state.features[this.state.currentFeature].featurename}</p>
          <p>Feature Type: {this.state.features[this.state.currentFeature].featuretype}</p>
          <p>Feature Usage1: {this.state.features[this.state.currentFeature].usage1}</p>
          <p>Feature Usage2: {this.state.features[this.state.currentFeature].usage2}</p>
          <p>Feature Usage3: {this.state.features[this.state.currentFeature].usage3}</p>
          <p>Feature Popularity: {this.state.features[this.state.currentFeature].popularity}</p>
        </div>
      )
    }

    return (  
      <div>
        <h3>Hello {this.state.name}!</h3>
        <p>You seem to like using {this.state.editor}, let's get better at it!</p>
        <p>Here's something to work on for today.</p>
        {feature}
        {
          this.state.currentFeature > 0 ? 
          <button onClick={this.decreaseCurrentFeature.bind(this)}>show previous feature</button> : <button disabled='true'>show previous feature</button>
        }
        {
          this.state.currentFeature < this.state.features.length - 1 ?
          <button onClick={this.increaseCurrentFeature.bind(this)}>show next feature</button> : <button disabled='true'>show next feature</button>
        }
      </div> 
    )
  }
}

export default User;