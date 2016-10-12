import React, { Component } from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LinearProgress from 'material-ui/LinearProgress';
import history from '../../core/history';
import Link from '../../components/Link/Link';
import Image from '../../components/Image';

import s from './Platforms.css';

import configs from '../../config/platforms.json';

const Platform = ({name, title, image, available, onClick}) => {
  const classNames = classnames(s.availabilityCheckIcon, "fa", available ? 'fa-check' : 'fa-close', available ? s.available : s.unavailable);
  return (
    <div key={`platform-${name}`} className={s.platform} key={`platform-thumb-${name}`} onClick={() => onClick(`/platform/${name}`)}>
        <Image src={image} alt={title} />
        <div className={s.platformTitle}>{title}</div>
        <i className={classNames} />
    </div>
  )
};

class Platforms extends Component
{
  constructor(...props) {
    super(...props);

    this.onHandleClick = ::this.onHandleClick;
  }

  onHandleClick(url) {
    history.push(url);
  }

  renderPlatforms() {
    const { isChecking, checkList } = this.props;

    if (isChecking || checkList == undefined) {
      return (<LinearProgress />);
    }

    return (
      <div className={s.list}>
        {
          configs.map((platform) => {
            const isAvailable = checkList[platform.name];
            return (
              <Platform key={`emu-${platform.name}`} {...platform}
                available={isAvailable}
                onClick={this.onHandleClick}
              />
            )
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className={s.container}>
        <h1>Emulators</h1>
        {this.renderPlatforms()}
      </div>
    )
  }
}

export default withStyles(s)(Platforms);
