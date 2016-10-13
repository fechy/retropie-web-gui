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
import System from './System';
import { findSystemById } from '../../helpers';

export const path = '/system/:id';

export const action = async ({ params }) => {
  const system = findSystemById(params.id);
  if (!system) {
    return {
      title: 'Unknown',
      component: <NotFound title={'Ups... nothing to show!'} { ...params } />,
    };
  }

  return {
    title: system.title,
    component: <System { ...params } />,
  };
};

export default {
  path,
  action
}
