var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var Header = function Header() {
    return React.createElement(
        'div',
        { className: 'header' },
        React.createElement('img', { src: 'favicons/android-chrome-192x192.png', className: 'logo' }),
        React.createElement(
            'div',
            { className: 'content' },
            React.createElement(
                'h2',
                null,
                'Hopf Fibration Visualization'
            ),
            React.createElement(
                'div',
                { className: 'subtitle' },
                'Made with ',
                '<3',
                ' by Samuel J. Li'
            )
        )
    );
};

var Instructions = function (_React$PureComponent) {
    _inherits(Instructions, _React$PureComponent);

    function Instructions() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Instructions);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Instructions.__proto__ || Object.getPrototypeOf(Instructions)).call.apply(_ref, [this].concat(args))), _this), _this.state = { shown: true }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Instructions, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    'div',
                    { id: 'instructions-container', className: this.state.shown ? 'visible' : 'hidden' },
                    React.createElement(
                        'div',
                        { className: 'instructions' },
                        React.createElement(Header, null),
                        React.createElement(
                            'p',
                            { className: 'mobile' },
                            'Tap on the sphere to add points. Drag to move the camera, and pinch to zoom.'
                        ),
                        React.createElement(
                            'p',
                            { className: 'desktop' },
                            'Click on the sphere to add points. Drag to move the camera, and scroll to zoom.'
                        ),
                        React.createElement(
                            'p',
                            null,
                            'The main view shows the fibers over the selected points under the Hopf map, stereographically projected into three-space.'
                        ),
                        React.createElement(
                            'button',
                            { className: 'accept', onClick: function onClick() {
                                    return _this2.setState({ shown: false });
                                } },
                            'Got it!'
                        )
                    )
                ),
                React.createElement(
                    'button',
                    { id: 'help', onClick: function onClick() {
                            return _this2.setState({ shown: true });
                        } },
                    '?'
                )
            );
        }
    }]);

    return Instructions;
}(React.PureComponent);

var domContainer = document.querySelector('#react');
ReactDOM.render(e(Instructions), domContainer);