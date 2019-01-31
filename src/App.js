import React, { Component } from 'react';
import * as axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      apiBase: 'https://dashboard-api.jh.fyi',
      images: [],
    };
  }

  componentDidMount() {
    axios.get(this.state.apiBase)
      .then((response) => {
        const data = response.data;
        this.setState({ images: data.images });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App__background" style={ this.inlineStyleBg(this.randomImageSrc()) } />
      </div>
    );
  }

  randomImageSrc() {
    var images = this.state.images;

    if (!images.length) {
      return false;
    }

    const randomImgPath = images[Math.floor(Math.random() * images.length)];

    return `${this.state.apiBase}${randomImgPath}`;
  }

  inlineStyleBg(imgSrc) {
    return {
      backgroundImage: `url(${imgSrc})`,
    };
  }
}

export default App;
