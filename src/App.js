import React, { Component } from 'react';
import * as axios from 'axios';
import './App.css';
import Background from './Background';
import Clock from './Clock';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      apiBase: 'https://dashboard-api.jh.fyi',
      randomImgSrc: '',
    };
  }

  componentDidMount() {
    axios.get(this.state.apiBase)
      .then((response) => {
        const data = response.data;
        this.setState({ randomImgSrc: this.getRandomImageSrc(data.images) });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <Background src={ this.state.randomImgSrc }>
          <Clock></Clock>
        </Background>
      </div>
    );
  }

  getRandomImageSrc(images) {
    if (!images || !images.length) {
      return false;
    }

    const randomImgPath = images[Math.floor(Math.random() * images.length)];

    return `${this.state.apiBase}${randomImgPath}`;
  }
}

export default App;
