import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './progressbar.css';

function ProgressBar({ percentage }) {
  return (
    <div className={s.container}>
      <div className={s.bar} style={{ width: `${percentage}%` }}>{percentage}%</div>
    </div>
  )
}

export default withStyles(s)(ProgressBar);
