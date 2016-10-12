import React, { Component } from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LinearProgress from 'material-ui/LinearProgress';
import history from '../../core/history';
import Link from '../../components/Link/Link';
import Image from '../../components/Image';

import s from './systems.css';

import configs from '../../config/systems.json';

const System = ({name, title, image, available, onClick}) => {
  const classNames = classnames(s.availabilityCheckIcon, "fa", available ? 'fa-check' : 'fa-close', available ? s.available : s.unavailable);
  return (
    <div key={`system-${name}`} className={s.system} onClick={() => onClick(`/system/${name}`)}>
        <Image src={image} alt={title} />
        <div className={s.systemTitle}>{title}</div>
        <i className={classNames} />
    </div>
  )
};

class Systems extends Component
{
  constructor(...props) {
    super(...props);

    this.onHandleClick = ::this.onHandleClick;
  }

  onHandleClick(url) {
    history.push(url);
  }

  renderSystems() {
    const { isChecking, checkList } = this.props;

    if (isChecking || checkList == undefined) {
      return (<LinearProgress />);
    }

    return (
      <div className={s.list}>
        {
          configs.map((system) => {
            const isAvailable = checkList[system.name];
            return (
              <System key={`emu-${system.name}`} {...system}
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
        <h1>Systems</h1>
        {this.renderSystems()}
      </div>
    )
  }
}

export default withStyles(s)(Systems);
