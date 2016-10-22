import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import mathjs from 'mathjs';

import * as statsAction from '../../actions/stats';

import s from './MiniStats.css';

const mapStateToProps = (state) => {
  return {
    isChecking: state.stats.get('isChecking'),
    disk: state.stats.get('disk'),
    cpu: state.stats.get('cpu'),
    memory: state.stats.get('memory'),
    temp: state.stats.get('temp'),
  }
};

class MiniStats extends Component
{
  render() {
    const { isChecking, disk, memory, temp } = this.props;
    if (isChecking) {
      return (<span />);
    }

    return (
      <div className={s.container}>
        <div className={classnames(s.stat, disk.availablePercentage >= 80 ? s.high : '')}>
          <i className="fa fa-database" />
          <span>{ mathjs.round(100 - disk.availablePercentage, 2) }%</span>
        </div>
        <div className={classnames(s.stat, memory.percentage >= 80 ? s.high : '')}>
          <i className="fa fa-tachometer" />
          <span>{ mathjs.round(100 - memory.percentage, 2) }%</span>
        </div>
        <div className={classnames(s.stat, temp.temp >= 80 ? s.high : '')}>
          <i className="fa fa-fire" />
          <span>{ mathjs.round(temp.temp, 2) }&deg;</span>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(withStyles(s)(MiniStats));
