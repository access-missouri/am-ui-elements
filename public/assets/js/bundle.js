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

},{"./components/quick-search":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QuickSearchResult = undefined;

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

var AMQuickSearch = function (_React$Component2) {
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

},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanN4L2FwcC5qc3giLCJzcmMvanN4L2NvbXBvbmVudHMvcXVpY2stc2VhcmNoLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O3dCQ0FRLGE7Ozs7Ozs7Ozs7Ozs7O0FDQVI7Ozs7Ozs7Ozs7OztBQUVBLFNBQVMsUUFBVCxDQUFrQixFQUFsQixFQUFzQixLQUF0QixFQUE2QjtBQUN6QixRQUFJLFFBQVEsSUFBWjtBQUNBLFdBQU8sWUFBWTtBQUNmLFlBQUksVUFBVSxJQUFkO0FBQUEsWUFBb0IsT0FBTyxTQUEzQjtBQUNBLHFCQUFhLEtBQWI7QUFDQSxnQkFBUSxXQUFXLFlBQVk7QUFDM0IsZUFBRyxLQUFILENBQVMsT0FBVCxFQUFrQixJQUFsQjtBQUNILFNBRk8sRUFFTCxLQUZLLENBQVI7QUFHSCxLQU5EO0FBT0g7O0lBSVksaUIsV0FBQSxpQjs7O0FBQ1QsK0JBQVksS0FBWixFQUFrQjtBQUFBOztBQUFBLHFJQUNSLEtBRFE7QUFFakI7Ozs7aUNBRVE7QUFDTCxtQkFBTztBQUFBO0FBQUEsa0JBQUssV0FBVSxRQUFmO0FBRUUscUJBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsSUFBbEIsSUFBMEIsTUFBM0IsSUFFSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsMEJBQUksV0FBVSxXQUFkO0FBQUE7QUFBQSxxQkFESjtBQUVJO0FBQUE7QUFBQSwwQkFBSSxXQUFVLE9BQWQ7QUFBc0I7QUFBQTtBQUFBLDhCQUFHLE1BQU0sS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixHQUEzQjtBQUFpQyxpQ0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixVQUFuRDtBQUFBO0FBQW1FLGlDQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCO0FBQXJGO0FBQXRCLHFCQUZKO0FBR0k7QUFBQTtBQUFBLDBCQUFHLFdBQVUsYUFBYjtBQUE0Qiw2QkFBSyxLQUFMLENBQVcs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LDZCQU5EO0FBRlI7QUFkWjtBQURKO0FBTFosYUFESjtBQXlDSDs7OztFQTlJdUIsZ0JBQU0sUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCB7QU1RdWlja1NlYXJjaH0gZnJvbSAnLi9jb21wb25lbnRzL3F1aWNrLXNlYXJjaCc7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBkZWJvdW5jZShmbiwgZGVsYXkpIHtcbiAgICB2YXIgdGltZXIgPSBudWxsO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgfTtcbn1cblxuXG5cbmV4cG9ydCBjbGFzcyBRdWlja1NlYXJjaFJlc3VsdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4oPGRpdiBjbGFzc05hbWU9XCJyZXN1bHRcIj5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAodGhpcy5wcm9wcy5yZXN1bHQudHlwZSA9PSAnYmlsbCcpICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0eXBlLWJpbGxcIj5CaWxsPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJsYWJlbFwiPjxhIGhyZWY9e3RoaXMucHJvcHMucmVzdWx0LnVybH0+e3RoaXMucHJvcHMucmVzdWx0LmlkZW50aWZpZXJ9IGluIHt0aGlzLnByb3BzLnJlc3VsdC5zZXNzaW9ufTwvYT48L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj57dGhpcy5wcm9wcy5yZXN1bHQuZGVzY3JpcHRpb259PC9wPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICh0aGlzLnByb3BzLnJlc3VsdC50eXBlID09ICdwZXJzb24nKSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidHlwZS1wZXJzb25cIj5QZXJzb248L2gzPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImxhYmVsXCI+PGEgaHJlZj17dGhpcy5wcm9wcy5yZXN1bHQudXJsfT57dGhpcy5wcm9wcy5yZXN1bHQubmFtZX08L2E+PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9kaXY+KTtcbiAgICB9XG59XG5cbmNsYXNzIEFNUXVpY2tTZWFyY2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9ICB7XG4gICAgICAgICAgICBzZWFyY2hJc09wZW46IGZhbHNlLFxuICAgICAgICAgICAgc2VhcmNoUmVzdWx0czogW11cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVib3VuY2VTZWFyY2ggPSBkZWJvdW5jZSh0aGlzLnN1Ym1pdFNlYXJjaCwgMTAwMCk7XG4gICAgfVxuXG4gICAgb3BlblNlYXJjaCgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlYXJjaElzT3BlbjogdHJ1ZVxuICAgICAgICB9KVxuICAgIH1cbiAgICBjbG9zZVNlYXJjaCgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlYXJjaElzT3BlbjogZmFsc2UsXG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiBbXVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN1Ym1pdFNlYXJjaCgpe1xuICAgICAgICBsZXQgcXVlcnkgPSB0aGlzLnJlZnMuc2VhcmNoUXVlcnkudmFsdWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVmcy5zZWFyY2hRdWVyeS52YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWFyY2hSZXN1bHRzOltdXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgbGV0IGJpbGxSZXF1ZXN0VXJsID0gKGAvYXBpL2JpbGxzLz9pZGVudGlmaWVyX3NlYXJjaD0ke2VuY29kZVVSSShxdWVyeSl9YCk7XG4gICAgICAgIGxldCBwZXJzb25SZXF1ZXN0VXJsID0gKGAvYXBpL3Blb3BsZS8/aW5kZXhfbmFtZV9zZWFyY2g9JHtlbmNvZGVVUkkocXVlcnkpfWApO1xuXG5cbiAgICAgICAgLy8gQmlsbCBGZXRjaFxuICAgICAgICBmZXRjaChiaWxsUmVxdWVzdFVybCx7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCBqc29uUmVzcCA9IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHJldHVybiBqc29uUmVzcDtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBuZXR3b3JrIGVycm9yXG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcblxuICAgICAgICAgICAgbGV0IGJpbGxSZXN1bHRzID0gZGF0YVsncmVzdWx0cyddLnNsaWNlKDAsNCkubWFwKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmlsbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiByZXN1bHQuaWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb246IHJlc3VsdC5sZWdpc2xhdGl2ZV9zZXNzaW9uLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogcmVzdWx0LnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgL2JpbGxzLyR7cmVzdWx0LmlkfWBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHM6IHRoaXMuc3RhdGUuc2VhcmNoUmVzdWx0cy5jb25jYXQoYmlsbFJlc3VsdHMpLFxuICAgICAgICAgICAgICAgIHNlYXJjaFJldHVybmVkOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyBQZXJzb24gRmV0Y2hcbiAgICAgICAgZmV0Y2gocGVyc29uUmVxdWVzdFVybCx7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGxldCBqc29uUmVzcCA9IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIHJldHVybiBqc29uUmVzcDtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBuZXR3b3JrIGVycm9yXG4gICAgICAgIH0pLnRoZW4oKGRhdGEpID0+IHtcblxuICAgICAgICAgICAgbGV0IGJpbGxSZXN1bHRzID0gZGF0YVsncmVzdWx0cyddLnNsaWNlKDAsNCkubWFwKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGVyc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3VsdC5pbmRleF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgL3Blb3BsZS8ke3Jlc3VsdC5pZH1gXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzOiB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMuY29uY2F0KGJpbGxSZXN1bHRzKSxcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXR1cm5lZDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlciAoKSB7XG5cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInJlYWN0aXZlLXF1aWNrLXNlYXJjaFwiPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwic2VhcmNoLWxpbmtcIiBvbkNsaWNrPXt0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKX0+U2VhcmNoPC9hPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zZWFyY2hJc09wZW4gJiZcbiAgICAgICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWljay1zZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdWljay1zZWFyY2gtbWVjaGFuaWNzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoLXdpbmRvdy1jb250cm9sc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcyl9PkNsb3NlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlYXJjaC13aW5kb3ctYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU9XCJzZWFyY2hRdWVyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwic2VhcmNoUXVlcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5kZWJvdW5jZVNlYXJjaC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Gb2N1cy8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5zdGF0ZS5zZWFyY2hSZXN1bHRzLmxlbmd0aCA+IDApICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWFyY2gtcmVzdWx0c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlYXJjaFJlc3VsdHMubWFwKGZ1bmN0aW9uKHJlc3VsdCwgaSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFF1aWNrU2VhcmNoUmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ9e3Jlc3VsdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuIl19
