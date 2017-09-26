import React from 'react';
import $ from 'jquery';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigateNext from 'material-ui/svg-icons/image/navigate-next';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import ThumbsUp from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import ThumbsDown from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import Chip from 'material-ui/Chip';
import {blue300, cyan300} from 'material-ui/styles/colors';

const paperStyle = {
  height: 700,
  width: 500,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
};

const buttonStyle = {
  margin: 12
};

const chipStyle = {
  chip: {
    margin: 4,
    left: '25%'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const footerStyle = {
  'font-size': 10
};

const divStyle = {
  'padding': '0px 30px'
};

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

  increasePopularity() {
    var currentPopularity = this.state.features[this.state.currentFeature].popularity;
    currentPopularity++;
    this.updateFeature(currentPopularity);
  }

  decreasePopularity() {
    var currentPopularity = this.state.features[this.state.currentFeature].popularity;
    currentPopularity--;
    this.updateFeature(currentPopularity);
  }

  updateFeature(popularityNum) {
    var self = this;
     $.ajax({
      url: `/featureupdate`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        editor: this.state.editor,
        featureid: this.state.features[this.state.currentFeature]['_id'],
        popularity: popularityNum
      }),
      success: data => {
        self.fetchFeatures(self.state.editor)
      },
      failure: error => {
        console.log(error);
      }
    }) 
  }

  render() {
    let feature = null;
    if (this.state.features.length !== 0) {
      feature = (
        <div style={divStyle}>
          <h4>{this.state.features[this.state.currentFeature].featurename}</h4>
          <p>{this.state.features[this.state.currentFeature].usage1}</p>
          <p>{this.state.features[this.state.currentFeature].usage2}</p>
          <p>{this.state.features[this.state.currentFeature].usage3}</p>
          
          <div style={chipStyle.wrapper}>
          <Chip 
            style={chipStyle.chip}
            backgroundColor={cyan300}
          >
          Type: {this.state.features[this.state.currentFeature].featuretype}
          </Chip>
          <Chip 
            style={chipStyle.chip}
            backgroundColor={blue300}
          >
          Popularity: {this.state.features[this.state.currentFeature].popularity}
          </Chip>
          </div>
        </div>
      )
    }
    let imgUrl = `https://robohash.org/${this.state.email}`;

    return (  
      <Paper style={paperStyle} zDepth={1}>
        <br />
        <img src={imgUrl} style={{width: '125px'}}/>
        <h3>三三ᕕ( ᐛ )ᕗ Hello {this.state.name}!</h3>
        <p>You seem to like using {this.state.editor}, let's get better at it!</p>
        <p>Here's something to work on for today.</p>
        <br />
        {feature}
        <br />
        <br />
        <IconButton
          icon={ThumbsUp}
          tooltip="this was useful!"
          tooltipPosition="top-left"
          onClick={this.increasePopularity.bind(this)}
        ><ThumbsUp /></IconButton>

        <IconButton
          tooltip="this was not useful!"
          tooltipPosition="top-right"
          onClick={this.decreasePopularity.bind(this)}
        ><ThumbsDown /></IconButton>
        <br />
        {
          this.state.currentFeature > 0 ? 
          <FlatButton
            label="previous feature"
            onClick={this.decreaseCurrentFeature.bind(this)}
            labelPosition="after"
            primary={true}
            icon={<NavigateBefore />}
          />
          :
          <FlatButton
            label="previous feature"
            onClick={this.decreaseCurrentFeature.bind(this)}
            labelPosition="after"
            primary={true}
            disabled={true}
            icon={<NavigateBefore />}
          />
        }
        {
          this.state.currentFeature < this.state.features.length - 1 ?
            <FlatButton
              label="next feature"
              onClick={this.increaseCurrentFeature.bind(this)}
              labelPosition="before"
              primary={true}
              icon={<NavigateNext />}
            />
          :
            <FlatButton
              label="next feature"
              labelPosition="before"
              primary={true}
              disabled={true}
              icon={<NavigateNext />}
            />
        }
        <p style={footerStyle}>made with love at hack reactor  ¯\_(ツ)_/¯</p>
      </Paper>
    )
  }
}

export default User;