import React, { Component } from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LinearProgress from 'material-ui/LinearProgress';
import history from '../../core/history';
import Link from '../../components/Link/Link';
import Image from '../../components/Image';

import {check} from '../../processors/list';

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

    this.state = {
      checking: true,
      checkList: [],
    };
  }

  componentWillMount() {
    check().then((list) => {
      this.setState({
        checking: false,
        checkList: list,
      });
    });
  }

  onHandleClick(url) {
    history.push(url);
  }

  render() {
    if (this.state.checking) {
      return (
        <div className={s.container}>
          <LinearProgress />
        </div>
      );
    }

    return (
      <div className={s.container}>
        <div className={s.list}>
          {configs.map((platform) => <Platform {...platform} available={this.state.checkList[platform.name]} onClick={::this.onHandleClick} /> )}
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Platforms);
