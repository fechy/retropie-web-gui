/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import fetch from '../../core/fetch';
import Platform from './Platform';

export const action = async ({ params }) => {
  const resp = await fetch(`/api/list/${params.id}`);
  const data = await resp.json();
  return {
    component: <Platform { ...params } list={data.list} />,
  };
};

export const path = '/platform/:id';

export default {
  path,
  action
}
