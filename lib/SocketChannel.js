'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Utils = require('./Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SocketChannel = function (_React$Component) {
  (0, _inherits3.default)(SocketChannel, _React$Component);

  function SocketChannel(props, context) {
    (0, _classCallCheck3.default)(this, SocketChannel);
    return (0, _possibleConstructorReturn3.default)(this, (SocketChannel.__proto__ || (0, _getPrototypeOf2.default)(SocketChannel)).call(this, props, context));
  }

  (0, _createClass3.default)(SocketChannel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          name = _props.name,
          handler = _props.handler;
      var socket = this.context.socket;


      if (!socket) {
        (0, _Utils.warning)('Socket IO connection has not been established.');
        return;
      }

      var channel = socket.subscribe(name);
      channel.on('subscribe', function (channel_name) {
        // debug(channelName);
        console.log(channel_name);
      });

      channel.watch(handler);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props2 = this.props,
          name = _props2.name,
          handler = _props2.handler;
      var socket = this.context.socket;


      if (!socket) {
        (0, _Utils.warning)('Socket IO connection has not been established.');
        return;
      }

      socket.unsubscribe(name, handler);
    }
  }, {
    key: 'render',
    value: function render() {
      return false;
    }
  }]);
  return SocketChannel;
}(_react2.default.Component);

;

SocketChannel.contextTypes = {
  socket: _propTypes2.default.object.isRequired
};

SocketChannel.propTypes = {
  name: _propTypes2.default.string.isRequired,
  handler: _propTypes2.default.func.isRequired
};

exports.default = SocketChannel;