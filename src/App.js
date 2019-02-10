import React, { Component } from 'react';
import * as axios from 'axios';
import './App.css';
import DynamicBackground from './DynamicBackground';
import Clock from './Clock';

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
        const images = [ ...data.images ];

        this.setState({
          images: this.normalizeImageData(images)
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <DynamicBackground images={ this.state.images } slideTime={ 30 * 1000 }>
          <Clock></Clock>
        </DynamicBackground>
      </div>
    );
  }

  normalizeImageData(rawImageUris) {
    if (!rawImageUris || !rawImageUris.length) {
      return [];
    }

    return rawImageUris.map(uri => `${this.state.apiBase}${uri}`);
  }
}

export default App;
