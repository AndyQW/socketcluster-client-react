import React from 'react';
import PropTypes from 'prop-types';

import { warning } from './Utils';

class SocketChannel extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { name, handler } = this.props;
    const { socket } = this.context;

    if (!socket) {
      warning('Socket IO connection has not been established.');
      return;
    }

    var channel = socket.subscribe(name);
    channel.on('subscribe', ( channel_name) => {
      // debug(channelName);
      console.log(channel_name)
    });

    channel.watch(handler)
  }

  componentWillUnmount() {
    const { name, handler } = this.props;
    const { socket } = this.context;

    if (!socket) {
      warning('Socket IO connection has not been established.');
      return;
    }

    socket.unsubscribe(name, handler);
  }

  render() {
    return false;
  }
};

SocketChannel.contextTypes = {
  socket: PropTypes.object.isRequired
};

SocketChannel.propTypes = {
  name: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired
};

export default SocketChannel;