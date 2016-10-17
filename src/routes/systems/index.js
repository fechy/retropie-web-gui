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
import Systems from './Systems';

export const path = '/systems';

export const action = async () => {
  return {
    title: `Systems`,
    component: <Systems />,
  };
};

export default {
  path,
  action
}
