/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link/Link';

import s from './Home.css';

class Home extends Component
{
  render() {
    return (
      <Layout>
        <div className={s.root}>
          <div className={s.container}>
            <ul className={s.bigButtons}>
              <li>
                <Link to={`/stats`}>
                  <i className="fa fa-database" />
                  <p>System Stats</p>
                </Link>
              </li>
              <li>
                <Link to={`/systems`}>
                  <i className="fa fa-gamepad" />
                  <p>Systems</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withStyles(s)(Home);
