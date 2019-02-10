import React, { Component } from 'react';
import classNames from 'classnames';
import './DynamicBackground.css';

class DynamicBackground extends Component {

  constructor(props) {
    super(props);

    this.state = {
      images: [],
      slideIndex: 0,
      slideImagesArr: [],
      stageBgImageSrc1: null,
      stageBgImageSrc2: null,
      activeStage: 1,
    };

    this.slideTime = this.props.slideTime || 3000;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.images !== this.state.images) {

      const randomizedImages = this.shuffleArray(nextProps.images);
      this.setState({
        images: nextProps.images,
        slideImagesArr: randomizedImages,
      });

      const src = randomizedImages[this.state.slideIndex];
      this.preLoadImg(src, () => {
        this.setState({ stageBgImageSrc1: src });
        
        setTimeout(() => {
          this.nextSlide();
        }, this.slideTime);
      });
    }
  }

  render() {
    const stage1classes = classNames({
      DynamicBackground__image: this.state.stageBgImageSrc1,
      stage1: true,
      active: this.state.activeStage === 1,
    });

    const stage2classes = classNames({
      DynamicBackground__image: this.state.stageBgImageSrc2,
      stage2: true,
      active: this.state.activeStage === 2,
    });

    return (
      <div className="DynamicBackground">
        <div className={ stage1classes } style={ this.inlineStyleBg(this.state.stageBgImageSrc1) }></div>
        <div className={ stage2classes } style={ this.inlineStyleBg(this.state.stageBgImageSrc2) }></div>

        { this.props.children ? <div className="DynamicBackground__container"> { this.props.children } </div> : '' }
      </div>
    );
  }

  nextSlide() {
    const nextIndex = this.state.slideIndex < this.state.slideImagesArr.length - 1 ? this.state.slideIndex += 1 : 0;
      
    this.preLoadImg(this.state.slideImagesArr[nextIndex], () => {
      const srcProp = this.state.activeStage === 1 ? 'stageBgImageSrc2' : 'stageBgImageSrc1';
      this.setState({
        [srcProp]: this.state.slideImagesArr[nextIndex],
        index: nextIndex,
        activeStage: this.state.activeStage === 1 ? 2 : 1,
      });

      setTimeout(() => {
        this.nextSlide();
      }, this.slideTime);
    });
  }

  preLoadImg(src, onLoadFn) {
    if (typeof src !== 'string' || typeof onLoadFn !== 'function') {
      console.error('src must be a string, onLoadFn must be a function');
      return;
    }

    const img = new Image();
    img.onload = () => {
      onLoadFn();
    };
    img.src = src;
  }

  inlineStyleBg(imgSrc) {
    if (!imgSrc) {
      return {};
    }

    return {
      backgroundImage: `url(${imgSrc})`,
    };
  }

  shuffleArray(originalArray) {
    const array = [ ...originalArray ];

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
}

export default DynamicBackground;
