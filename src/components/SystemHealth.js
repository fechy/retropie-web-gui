import React, { Component } from 'react';
import { connect } from 'react-redux'
import history from '../core/history';

import io from 'socket.io-client';

import * as actions from '../actions/stats';

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: data => dispatch(actions.update(data))
  }
};

const statEvent = 'system_health';

class SystemHealth extends Component
{
  socket;

  componentDidMount() {
    const { port, ip } = this.props;
    this.socket = io(`http://${ip}:${port}`);
    this.socket.on('init', () => {
      console.log('init!');
    });

    this.socket.on(statEvent, ::this._receiveData);
  }

  componentWillUnmount() {
    this.socket.removeAllListeners(statEvent);
  }

  _receiveData(time, data) {
    this.props.update(data);
  }

  render() {
    return(<s />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemHealth);
