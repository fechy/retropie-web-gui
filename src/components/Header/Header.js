/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Navigation from '../Navigation';
import logo from './RetroPie_Logo-60x60.png';
import s from './Header.css';

function Header() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={classnames(s.nav)}>
          <Navigation className={classnames(s.navigation, s.innerContainer)}>
            <div className={s.brand}>
              <img src={logo} />
            </div>
          </Navigation>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(Header);
