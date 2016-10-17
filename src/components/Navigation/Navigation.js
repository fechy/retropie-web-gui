/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';
import history from '../../core/history';

const locations = [
  {
    path: '/',
    title: 'Home',
  },
  {
    path: '/systems',
    title: 'Systems',
  },
  {
    path: '/stats',
    title: 'Stats',
  }
];

function Navigation({ className, children }) {
  const active = history.location ? history.location.pathname : '/';
  return (
    <div className={cx(s.root, className)} role="navigation">
      {children}
      {locations.map( location => <Link key={`key-${location.title.toLowerCase().replace(' ', '_')}`} className={cx(s.link, location.path == active ? s.active : '')} to={location.path}>{location.title}</Link> )}
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default withStyles(s)(Navigation);
