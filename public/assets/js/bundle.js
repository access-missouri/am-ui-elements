(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.amUI = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _quickSearch = require('./components/quick-search');

Object.defineProperty(exports, 'AMQuickSearch', {
  enumerable: true,
  get: function get() {
    return _quickSearch.AMQuickSearch;
  }
});

var _siteMenu = require('./components/site-menu');

Object.defineProperty(exports, 'SiteMenu', {
  enumerable: true,
  get: function get() {
    return _siteMenu.SiteMenu;
  }
});

},{"./components/quick-search":2,"./components/site-menu":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AMQuickSearch = exports.QuickSearchResult = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

var QuickSearchResult = exports.QuickSearchResult = function (_React$Component) {
    _inherits(QuickSearchResult, _React$Component);

    function QuickSearchResult(props) {
        _classCallCheck(this, QuickSearchResult);

        return _possibleConstructorReturn(this, (QuickSearchResult.__proto__ || Object.getPrototypeOf(QuickSearchResult)).call(this, props));
    }

    _createClass(QuickSearchResult, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'result' },
                this.props.result.type == 'bill' && _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        'h3',
                        { className: 'type-bill' },
                        'Bill'
                    ),
                    _react2.default.createElement(
                        'h3',
                        { className: 'label' },
                        _react2.default.createElement(
                            'a',
                            { href: this.props.result.url },
                            this.props.result.identifier,
                            ' in ',
                            this.props.result.session
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'description' },
                        this.props.result.description
                    )
                ),
                this.props.result.type == 'person' && _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        'h3',
                        { className: 'type-person' },
                        'Person'
                    ),
                    _react2.default.createElement(
                        'h3',
                        { className: 'label' },
                        _react2.default.createElement(
                            'a',
                            { href: this.props.result.url },
                            this.props.result.name
                        )
                    )
                )
            );
        }
    }]);

    return QuickSearchResult;
}(_react2.default.Component);

var AMQuickSearch = exports.AMQuickSearch = function (_React$Component2) {
    _inherits(AMQuickSearch, _React$Component2);

    function AMQuickSearch(props) {
        _classCallCheck(this, AMQuickSearch);

        var _this2 = _possibleConstructorReturn(this, (AMQuickSearch.__proto__ || Object.getPrototypeOf(AMQuickSearch)).call(this, props));

        _this2.state = {
            searchIsOpen: false,
            searchResults: []
        };

        _this2.debounceSearch = debounce(_this2.submitSearch, 1000);
        return _this2;
    }

    _createClass(AMQuickSearch, [{
        key: 'openSearch',
        value: function openSearch() {
            this.setState({
                searchIsOpen: true
            });
        }
    }, {
        key: 'closeSearch',
        value: function closeSearch() {
            this.setState({
                searchIsOpen: false,
                searchResults: []
            });
        }
    }, {
        key: 'submitSearch',
        value: function submitSearch() {
            var _this3 = this;

            var query = this.refs.searchQuery.value;
            console.log(this.refs.searchQuery.value);

            this.setState({
                searchResults: []
            });

            var billRequestUrl = '/api/bills/?identifier_search=' + encodeURI(query);
            var personRequestUrl = '/api/people/?index_name_search=' + encodeURI(query);

            // Bill Fetch
            fetch(billRequestUrl, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                var jsonResp = response.json();
                return jsonResp;
            }, function (error) {
                // handle network error
            }).then(function (data) {

                var billResults = data['results'].slice(0, 4).map(function (result) {
                    return {
                        type: 'bill',
                        identifier: result.identifier,
                        session: result.legislative_session.name,
                        description: result.title,
                        url: '/bills/' + result.id
                    };
                });

                _this3.setState({
                    searchResults: _this3.state.searchResults.concat(billResults),
                    searchReturned: true
                });
            });

            // Person Fetch
            fetch(personRequestUrl, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                var jsonResp = response.json();
                return jsonResp;
            }, function (error) {
                // handle network error
            }).then(function (data) {

                var billResults = data['results'].slice(0, 4).map(function (result) {
                    return {
                        type: 'person',
                        name: result.index_name,
                        url: '/people/' + result.id
                    };
                });

                _this3.setState({
                    searchResults: _this3.state.searchResults.concat(billResults),
                    searchReturned: true
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'li',
                { className: 'reactive-quick-search' },
                _react2.default.createElement(
                    'a',
                    { href: '#', className: 'search-link', onClick: this.openSearch.bind(this) },
                    'Search'
                ),
                this.state.searchIsOpen && _react2.default.createElement(
                    'div',
                    { className: 'quick-search-container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'quick-search-mechanics' },
                        _react2.default.createElement(
                            'div',
                            { className: 'search-window-controls' },
                            _react2.default.createElement(
                                'button',
                                { onClick: this.closeSearch.bind(this) },
                                'Close'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'search-window-box' },
                            _react2.default.createElement('input', { type: 'text',
                                name: 'searchQuery',
                                ref: 'searchQuery',
                                onKeyDown: this.debounceSearch.bind(this),
                                autoFocus: true })
                        ),
                        this.state.searchResults.length > 0 && _react2.default.createElement(
                            'div',
                            { className: 'search-results' },
                            this.state.searchResults.map(function (result, i) {
                                return _react2.default.createElement(QuickSearchResult, {
                                    result: result
                                });
                            })
                        )
                    )
                )
            );
        }
    }]);

    return AMQuickSearch;
}(_react2.default.Component);

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SiteMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = (window.React);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SiteMenu = exports.SiteMenu = function (_React$Component) {
    _inherits(SiteMenu, _React$Component);

    function SiteMenu(props) {
        _classCallCheck(this, SiteMenu);

        var _this = _possibleConstructorReturn(this, (SiteMenu.__proto__ || Object.getPrototypeOf(SiteMenu)).call(this, props));

        _this.state = {
            menuIsOpen: false
        };
        return _this;
    }

    _createClass(SiteMenu, [{
        key: "toggleMenu",
        value: function toggleMenu() {
            this.setState({
                menuIsOpen: !this.state.menuIsOpen
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "span",
                null,
                _react2.default.createElement(
                    "a",
                    { className: "menu-link", onClick: this.toggleMenu.bind(this) },
                    !this.state.menuIsOpen && _react2.default.createElement(
                        "span",
                        null,
                        "Menu"
                    ),
                    this.state.menuIsOpen && _react2.default.createElement(
                        "span",
                        null,
                        "Close"
                    )
                ),
                this.state.menuIsOpen && _react2.default.createElement(
                    "div",
                    { className: "nav-fs-menu" },
                    _react2.default.createElement(
                        "ul",
                        { className: "nav-list mobile" },
                        _react2.default.createElement(
                            "li",
                            { className: "nav-list-item nl-item-legislation" },
                            _react2.default.createElement(
                                "a",
                                { href: "/bills/" },
                                "Legislation"
                            )
                        ),
                        _react2.default.createElement(
                            "li",
                            { className: "nav-list-item nl-item-people" },
                            _react2.default.createElement(
                                "a",
                                { href: "/people/" },
                                "People"
                            )
                        ),
                        _react2.default.createElement(
                            "li",
                            { className: "nav-list-item nl-item-finance" },
                            _react2.default.createElement(
                                "a",
                                { href: "/finance/" },
                                "Finance"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return SiteMenu;
}(_react2.default.Component);

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanN4L2FwcC5qc3giLCJzcmMvanN4L2NvbXBvbmVudHMvcXVpY2stc2VhcmNoLmpzeCIsInNyYy9qc3gvY29tcG9uZW50cy9zaXRlLW1lbnUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7d0JDQVEsYTs7Ozs7Ozs7O3FCQUNBLFE7Ozs7Ozs7Ozs7Ozs7O0FDRFI7Ozs7Ozs7Ozs7OztBQUVBLFNBQVMsUUFBVCxDQUFrQixFQUFsQixFQUFzQixLQUF0QixFQUE2QjtBQUN6QixRQUFJLFFBQVEsSUFBWjtBQUNBLFdBQU8sWUFBWTtBQUNmLFlBQUksVUFBVSxJQUFkO0FBQUEsWUFBb0IsT0FBTyxTQUEzQjtBQUNBLHFCQUFhLEtBQWI7QUFDQSxnQkFBUSxXQUFXLFlBQVk7QUFDM0IsZUFBRyxLQUFILENBQVMsT0FBVCxFQUFrQixJQUFsQjtBQUNILFNBRk8sRUFFTCxLQUZLLENBQVI7QUFHSCxLQU5EO0FBT0g7O0lBSVksaUIsV0FBQSxpQjs7O0FBQ1QsK0JBQVksS0FBWixFQUFrQjtBQUFBOztBQUFBLHFJQUNSLEtBRFE7QUFFakI7Ozs7aUNBRVE7QUFDTCxtQkFBTztBQUFBO0FBQUEsa0JBQUssV0FBVSxRQUFmO0FBRUUscUJBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsSUFBbEIsSUFBMEIsTUFBM0IsSUFFSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsMEJBQUksV0FBVSxXQUFkO0FBQUE7QUFBQSxxQkFESjtBQUVJO0FBQUE7QUFBQSwwQkFBSSxXQUFVLE9BQWQ7QUFBc0I7QUFBQTtBQUFBLDhCQUFHLE1BQU0sS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixHQUEzQjtBQUFpQyxpQ0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixVQUFuRDtBQUFBO0FBQW1FLGlDQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCO0FBQXJGO0FBQXRCLHFCQUZKO0FB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QUFBO0FBQUE7QUFBOUM7QUFISjtBQURKO0FBSlIsYUFESjtBQWdCSDs7OztFQWxDeUIsZ0JBQU0sUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCB7QU1RdWlja1NlYXJjaH0gZnJvbSAnLi9jb21wb25lbnRzL3F1aWNrLXNlYXJjaCc7XG5leHBvcnQge1NpdGVNZW51fSBmcm9tICcuL2NvbXBvbmVudHMvc2l0ZS1tZW51JztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIGRlYm91bmNlKGZuLCBkZWxheSkge1xuICAgIHZhciB0aW1lciA9IG51bGw7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9O1xufVxuXG5cblxuZXhwb3J0IGNsYXNzIFF1aWNrU2VhcmNoUmVzdWx0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybig8ZGl2IGNsYXNzTmFtZT1cInJlc3VsdFwiPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICh0aGlzLnByb3BzLnJlc3VsdC50eXBlID09ICdiaWxsJykgJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInR5cGUtYmlsbFwiPkJpbGw8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImxhYmVsXCI+PGEgaHJlZj17dGhpcy5wcm9wcy5yZXN1bHQudXJsfT57dGhpcy5wcm9wcy5yZXN1bHQuaWRlbnRpZmllcn0gaW4ge3RoaXMucHJvcHMucmVzdWx0LnNlc3Npb259PC9hPjwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNjcmlwdGlvblwiPnt0aGlzLnByb3BzLnJlc3VsdC5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgKHRoaXMucHJvcHMucmVzdWx0LnR5cGUgPT0gJ3BlcnNvbicpICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0eXBlLXBlcnNvblwiPlBlcnNvbjwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwibGFiZWxcIj48YSBocmVmPXt0aGlzLnByb3BzLnJlc3VsdC51cmx9Pnt0aGlzLnByb3BzLnJlc3VsdC5uYW1lfTwvYT48L2gzPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICA8L2Rpdj4pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEFNUXVpY2tTZWFyY2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9ICB7XG4gICAgICAgICAgICBzZWFyY2hJc09wZW46IGZhbHNlLFxuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogW11cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVib3VuY2VTZWFyY2ggPSBkZWJvdW5jZSh0aGlzLnN1Ym1pdFNlYXJjaCwgMTAwMCk7XG4gICAgfVxuXG4gICAgb3BlblNlYXJjaCgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlYXJjaElzT3BlbjogdHJ1ZVxuICAgICAgICB9KVxuICAgIH1cbiAgICBjbG9zZVNlYXJjaCgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlYXJjaElzT3BlbjogZmFsc2UsXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBbXVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN1Ym1pdFNlYXJjaCgpe1xuICAgICAgICBsZXQgcXVlcnkgPSB0aGlzLnJlZnMuc2VhcmNoUXVlcnkudmFsdWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVmcy5zZWFyY2hRdWVyeS52YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOltdXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgbGV0IGJpbGxSZXF1ZXN0VXJsID0gKGAvYXBpL2JpbGxzLz9pZGVudGlmaWVyX3NlYXJjaD0ke2VuY29kZVVSSShxdWVyeSl9YCk7XG4gICAgICAgIGxldCBwZXJzb25SZXF1ZXN0VXJsID0gKGAvYXBpL3Blb3BsZS8/aW5kZXhfbmFtZV9zZWFyY2g9JHtlbmNvZGVVUkkocXVlcnkpfWApO1xuXG5cbiAgICAgICAgLy8gQmlsbCBGZXRjaFxuICAgICAgICBmZXRjaChiaWxsUmVxdWVzdFVybCx7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCBqc29uUmVzcCA9IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHJldHVybiBqc29uUmVzcDtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBuZXR3b3JrIGVycm9yXG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcblxuICAgICAgICAgICAgbGV0IGJpbGxSZXN1bHRzID0gZGF0YVsncmVzdWx0cyddLnNsaWNlKDAsNCkubWFwKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmlsbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiByZXN1bHQuaWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb246IHJlc3VsdC5sZWdpc2xhdGl2ZV9zZXNzaW9uLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcmVzdWx0LnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgL2JpbGxzLyR7cmVzdWx0LmlkfWBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5jb25jYXQoYmlsbFJlc3VsdHMpLFxuICAgICAgICAgICAgICAgIHNlYXJjaFJldHVybmVkOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyBQZXJzb24gRmV0Y2hcbiAgICAgICAgZmV0Y2gocGVyc29uUmVxdWVzdFVybCx7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCBqc29uUmVzcCA9IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHJldHVybiBqc29uUmVzcDtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBuZXR3b3JrIGVycm9yXG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcblxuICAgICAgICAgICAgbGV0IGJpbGxSZXN1bHRzID0gZGF0YVsncmVzdWx0cyddLnNsaWNlKDAsNCkubWFwKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGVyc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3VsdC5pbmRleF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgL3Blb3BsZS8ke3Jlc3VsdC5pZH1gXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMuY29uY2F0KGJpbGxSZXN1bHRzKSxcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXR1cm5lZDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlciAoKSB7XG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInJlYWN0aXZlLXF1aWNrLXNlYXJjaFwiPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwic2VhcmNoLWxpbmtcIiBvbkNsaWNrPXt0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKX0+U2VhcmNoPC9hPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hJc09wZW4gJiZcbiAgICAgICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWljay1zZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWljay1zZWFyY2gtbWVjaGFuaWNzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLXdpbmRvdy1jb250cm9sc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcyl9PkNsb3NlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC13aW5kb3ctYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJzZWFyY2hRdWVyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwic2VhcmNoUXVlcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5kZWJvdW5jZVNlYXJjaC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1cy8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLmxlbmd0aCA+IDApICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMubWFwKGZ1bmN0aW9uKHJlc3VsdCwgaSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFF1aWNrU2VhcmNoUmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ9e3Jlc3VsdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNsYXNzIFNpdGVNZW51IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSAge1xuICAgICAgICAgICAgbWVudUlzT3BlbjogZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZU1lbnUoKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBtZW51SXNPcGVuOiAhdGhpcy5zdGF0ZS5tZW51SXNPcGVuXG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICByZW5kZXIgKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwibWVudS1saW5rXCIgb25DbGljaz17dGhpcy50b2dnbGVNZW51LmJpbmQodGhpcyl9PnsgIXRoaXMuc3RhdGUubWVudUlzT3BlbiAmJiA8c3Bhbj5NZW51PC9zcGFuPiB9eyB0aGlzLnN0YXRlLm1lbnVJc09wZW4gJiYgPHNwYW4+Q2xvc2U8L3NwYW4+fTwvYT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUubWVudUlzT3BlbiAmJlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJuYXYtZnMtbWVudVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJuYXYtbGlzdCBtb2JpbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibmF2LWxpc3QtaXRlbSBubC1pdGVtLWxlZ2lzbGF0aW9uXCI+PGEgaHJlZj1cIi9iaWxscy9cIj5MZWdpc2xhdGlvbjwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJuYXYtbGlzdC1pdGVtIG5sLWl0ZW0tcGVvcGxlXCI+PGEgaHJlZj1cIi9wZW9wbGUvXCI+UGVvcGxlPC9hPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm5hdi1saXN0LWl0ZW0gbmwtaXRlbS1maW5hbmNlXCI+PGEgaHJlZj1cIi9maW5hbmNlL1wiPkZpbmFuY2U8L2E+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApXG4gICAgfVxufSJdfQ==
