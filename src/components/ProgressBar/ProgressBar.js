import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './progressbar.css';

class ProgressBar extends Component
{
  render() {
    const { percentage, max, symbol, low, normal } = this.props;

    let levelClassName = s.low;
    if (percentage >= low && percentage <= normal) {
      levelClassName = s.normal;
    } else if (percentage > normal) {
      levelClassName = s.high;
    }

    const sizePercentage = percentage * 100 / max;

    return (
      <div className={s.container}>
        <div className={classnames(s.bar, levelClassName)} style={{ width: `${sizePercentage}%` }}>{percentage}<span dangerouslySetInnerHTML={{ __html: symbol }} /></div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  max: PropTypes.number,
  symbol: PropTypes.string,
};

ProgressBar.defaultProps = {
  min:0,
  max: 100,
  low: 33,
  normal: 70,
  symbol: '%'
};

export default withStyles(s)(ProgressBar);
