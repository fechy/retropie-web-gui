import React, { Component } from 'react';
import { connect } from 'react-redux'
import history from '../core/history';

import io from 'socket.io-client';

import * as actions from '../actions/stats';

const mapStateToProps = (state) => {
  return { }
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: data => dispatch(actions.update(data)),
    updateTemp: data => dispatch(actions.updateTemp(data)),
  }
};

const statEvent = 'system_health';
const tempEvent = 'temperatureUpdate';

class SystemHealth extends Component
{
  socket;

  componentDidMount() {
    const { port, ip } = this.props;
    this.socket = io(`http://${ip}:${port}`);

    this.socket.on(statEvent, ::this.props.update);
    this.socket.on(tempEvent, ::this.props.updateTemp);
  }

  componentWillUnmount() {
    this.socket.removeAllListeners(statEvent);
    this.socket.removeAllListeners(tempEvent);
  }

  render() {
    return(<s />);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemHealth);
