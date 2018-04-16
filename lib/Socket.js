'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _socketclusterClient = require('socketcluster-client');

var _socketclusterClient2 = _interopRequireDefault(_socketclusterClient);

var _Utils = require('./Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Socket = function (_React$Component) {
  (0, _inherits3.default)(Socket, _React$Component);
  (0, _createClass3.default)(Socket, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { socket: this.socket };
    }
  }]);

  function Socket(props, context) {
    (0, _classCallCheck3.default)(this, Socket);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Socket.__proto__ || (0, _getPrototypeOf2.default)(Socket)).call(this, props, context));

    _this.socket = _socketclusterClient2.default.create(props.options);

    _this.socket.status = 'initialized';

    _this.socket.on('connect', function (data) {
      _this.socket.status = 'connected';
      (0, _Utils.debug)('connected');
    });

    _this.socket.on('disconnect', function (data) {
      _this.socket.status = 'disconnected';
      (0, _Utils.debug)('disconnect');
    });

    _this.socket.on('error', function (err) {
      _this.socket.status = 'failed';
      (0, _Utils.warning)('error', err);
    });

    _this.socket.on('reconnect', function (data) {
      _this.socket.status = 'connected';
      (0, _Utils.debug)('reconnect', data);
    });

    _this.socket.on('reconnect_attempt', function (data) {
      (0, _Utils.debug)('reconnect_attempt');
    });

    _this.socket.on('reconnecting', function (data) {
      _this.socket.status = 'reconnecting';
      (0, _Utils.debug)('reconnecting');
    });

    _this.socket.on('reconnect_failed', function (error) {
      _this.socket.status = 'failed';
      (0, _Utils.warning)('reconnect_failed', error);
    });
    return _this;
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

  (0, _createClass3.default)(Socket, [{
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);
  return Socket;
}(_react2.default.Component);

Socket.propTypes = {
  options: _propTypes2.default.object,
  children: _propTypes2.default.element.isRequired
};

Socket.childContextTypes = {
  socket: _propTypes2.default.object
};

exports.default = Socket;