import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  }
};

class MiniStats extends Component
{
  render() {
    const { isChecking, disk, memory, cpu } = this.props;
    if (isChecking) {
      return (<span />);
    }

    return (
      <div className={s.container}>
        <div className={s.stat}>
          <i className="fa fa-database" />
          <span>{ mathjs.round(disk.get('availablePercentage'), 2) }%</span>
        </div>
        <div className={s.stat}>
          <i className="fa fa-tachometer" />
          <span>{ mathjs.round(memory.get('percentage'), 2) }%</span>
        </div>
        <div className={s.stat}>
          <i className="fa fa-fire" />
          <span>{ mathjs.round(0, 2) }%</span>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(withStyles(s)(MiniStats));
