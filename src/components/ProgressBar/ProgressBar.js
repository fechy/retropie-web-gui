import React, { Component } from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './progressbar.css';

function ProgressBar({ percentage }) {
  let levelClassName = s.low;
  if (percentage >= 33 && percentage <= 70) {
    levelClassName = s.normal;
  } else if (percentage > 70) {
    levelClassName = s.high;
  }
  return (
    <div className={s.container}>
      <div className={classnames(s.bar, levelClassName)} style={{ width: `${percentage}%` }}>{percentage}%</div>
    </div>
  )
}

export default withStyles(s)(ProgressBar);
