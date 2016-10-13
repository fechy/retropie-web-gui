import React, { Component } from 'react';

const notFoundImage = require('./no_image_available.png');

class Image extends Component
{
  render() {
    const { src } = this.props;
    const imageSrc = src ? src : notFoundImage;
    return (
      <img {...this.props} src={imageSrc} />
    );
  }
}

export default Image;
