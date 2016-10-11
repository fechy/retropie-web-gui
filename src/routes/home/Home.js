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
import s from './Home.css';

import platformsConfig from '../../config/platforms.json';

function Home() {
  return (
    <Layout>
      <div className={s.container}>
        <ul>
          {
            platformsConfig.map((platform) => {
              return (
                <li key={`platform-thumb-${platform.name}`}>
                  <Link to={`/platform/${platform.name}`}>
                    <img src={platform.image} alt={platform.title}/>
                    <p>{platform.title}</p>
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    </Layout>
  );
}

export default withStyles(s)(Home);
