/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link/Link';
import Platforms from '../../components/Platforms';
import s from './Home.css';

function Home() {
  return (
    <Layout>
      <div className={s.container}>
        <Platforms />
      </div>
    </Layout>
  );
}

export default withStyles(s)(Home);
