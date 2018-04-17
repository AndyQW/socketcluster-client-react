import React from 'react';
import PropTypes from 'prop-types';
import socketCluster from 'socketcluster-client'

import { warning, debug } from './Utils';

class Socket extends React.Component {
  getChildContext() {
    return { socket: this.socket };
  }
  
  constructor(props, context) {
    super(props, context);

    this.socket = socketCluster.create(props.options);

    this.socket.status = 'initialized';

    this.socket.on('connect', (data) => {
      this.socket.status = 'connected';
      if ( props.options.onConnected) {
        props.options.onConnected(this.socket, data);
      }
      debug('connected');
    });

    this.socket.on('disconnect', (data) => {
      this.socket.status = 'disconnected';
      debug('disconnect');
    });

    this.socket.on('error', (err) => {
      this.socket.status = 'failed';
      warning('error', err);
    });

    this.socket.on('reconnect', (data) => {
      this.socket.status = 'connected';
      debug('reconnect', data);
    });

    this.socket.on('reconnect_attempt', (data) => {
      debug('reconnect_attempt');
    });

    this.socket.on('reconnecting', (data) => {
      this.socket.status = 'reconnecting';
      debug('reconnecting');
    });

    this.socket.on('reconnect_failed', (error) => {
      this.socket.status = 'failed';
      warning('reconnect_failed', error);
    });
  }

  // mergeOptions(options = {}) {
  //   const defaultOptions = {
  //     reconnection: true,
  //     reconnectionAttempts: Infinity,
  //     reconnectionDelay: 1 * 1000,
  //     reconnectionDelayMax: 10 * 1000,
  //     autoConnect: true,
  //     transports: ['polling'],
  //     rejectUnauthorized: true
  //   };
  //   return { ...defaultOptions, ...options };
  // }

  render() {
    return React.Children.only(this.props.children);
  }
}

Socket.propTypes = {
  options: PropTypes.object,
  children: PropTypes.element.isRequired
};

Socket.childContextTypes = {
  socket: PropTypes.object
};

export default Socket;