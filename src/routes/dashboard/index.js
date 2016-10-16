/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import NotFound from '../notFound/NotFound';
import Dashboard from './Dashboard';

export const path = '/dashboard';

export const action = async ({ params }) => {
  return {
    title: `Dashboard`,
    component: <Dashboard { ...params } />,
  };
};

export default {
  path,
  action
}
