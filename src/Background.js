import React, { Component } from 'react';
import './Background.css';

class Background extends Component {

  constructor(props) {
    super(props);

    this.state = {
      src: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.state.src) {
      const img = new Image();

      img.onload = () => {
        this.setState({ src: nextProps.src });
      };

      img.src = nextProps.src;
    }
  }

  render() {
    return (
      <div className="Background">
        { this.state.src ? this.buildImgBgElement() : '' }
        { this.props.children ? <div className="Background__container"> { this.props.children } </div> : '' }
      </div>
    );
  }

  buildImgBgElement() {
    return (
      <div className="Background__image" style={ this.inlineStyleBg(this.state.src) } />
    );
  }

  randomImageSrc(images) {
    if (!images || !images.length) {
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

export default Background;
