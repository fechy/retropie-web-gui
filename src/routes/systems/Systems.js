import React, { Component } from 'react';
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Link from '../../components/Link/Link';
import SystemsList from '../../components/SystemsList';
import * as actions from '../../actions/check';
import s from './systems.css';

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

class Systems extends Component
{
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { isChecking, checkList } = this.props;

    return (
      <Layout>
        <div className={s.container}>
          <SystemsList isChecking={isChecking} checkList={checkList} />
        </div>
      </Layout>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(s)(Systems));
