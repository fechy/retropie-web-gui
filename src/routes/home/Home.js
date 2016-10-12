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
import Systems from '../../components/Systems';
import * as actions from '../../actions/check';
import s from './Home.css';

const mapStateToProps = (state) => {
  return {
    isChecking: state.check.get('isChecking'),
    checkList: state.check.get('list'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => dispatch(actions.check()),
  }
};

class Home extends Component
{
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { isChecking, checkList } = this.props;

    return (
      <Layout>
        <div className={s.container}>
          <Systems isChecking={isChecking} checkList={checkList} />
        </div>
      </Layout>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(s)(Home));
