import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {

  constructor(props) {
    super(props);

    this.state = {
      time: new Date()
    }
  }

  componentDidMount() {
    setInterval(this.update.bind(this), 1000)
  }

  update() {
    this.setState({
      time: new Date(),
    });
  }

  fmtH(raw) {
    const fmt = raw % 12;

    if (fmt > 0) {
      return fmt;
    }

    return 12;
  }

  fmtM(raw) {
    return raw < 10 ? '0' + raw : raw;
  }

  fmtS(raw) {
    return raw < 10 ? '0' + raw : raw;
  }

  render() {
    const h = this.fmtH(this.state.time.getHours());
    const m = this.fmtM(this.state.time.getMinutes());
    const s = this.fmtS(this.state.time.getSeconds());
    const p = this.state.time.getHours() < 12 ? 'am' : 'pm';
    
    return (
      <div className="Clock">
        <span className="Clock-h">{ h }</span>
        <span className="Clock-sep">:</span>
        <span className="Clock-m">{ m }</span>
        <span className="Clock-p">{ p }</span>
      </div>
    );
  }

}

export default Clock;
