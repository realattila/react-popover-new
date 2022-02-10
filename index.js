Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var Popover = function (_a) {
    var children = _a.children, content = _a.content;
    var elementRef = React.useRef(null);
    var popoverRef = React.useRef(null);
    var arrowRef = React.useRef(null);
    var _b = React.useState({
        left: 0,
        top: 0,
        right: "auto",
        bottom: "auto",
        width: 200,
        show: false,
    }), popoverPosition = _b[0], setPopoverPosition = _b[1];
    var _c = React.useState({
        left: 0,
        right: "auto",
        top: 0,
        bottom: "auto",
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    }), arrowPosition = _c[0], setArrowPosition = _c[1];
    var alignFromRight = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var popoverBounding = (_a = popoverRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        console.log(popoverBounding, window.scrollY, window.innerHeight, document.body.scrollHeight);
        var offsetTopNeed = (popoverBounding === null || popoverBounding === void 0 ? void 0 : popoverBounding.y) || 0 + (!!(popoverBounding === null || popoverBounding === void 0 ? void 0 : popoverBounding.height) ? popoverBounding === null || popoverBounding === void 0 ? void 0 : popoverBounding.height : 0) - window.innerHeight;
        var offsetLeftNeed = (!!(popoverBounding === null || popoverBounding === void 0 ? void 0 : popoverBounding.x) ? popoverBounding === null || popoverBounding === void 0 ? void 0 : popoverBounding.x : 0) +
            popoverPosition.width / 2 -
            document.body.getBoundingClientRect().width +
            (!!((_b = elementRef.current) === null || _b === void 0 ? void 0 : _b.clientWidth) ? (_c = elementRef.current) === null || _c === void 0 ? void 0 : _c.clientWidth : 0);
        if (offsetTopNeed > 0) {
            setPopoverPosition(__assign(__assign({}, popoverPosition), { show: true, left: -((popoverBounding === null || popoverBounding === void 0 ? void 0 : popoverBounding.width) || 0 / 2 - (((_d = elementRef.current) === null || _d === void 0 ? void 0 : _d.clientWidth) || 0) / 2) -
                    (offsetLeftNeed > 0 ? offsetLeftNeed - (((_e = elementRef.current) === null || _e === void 0 ? void 0 : _e.clientWidth) || 0) / 2 : 0), top: -(((popoverBounding === null || popoverBounding === void 0 ? void 0 : popoverBounding.height) || 0) + 5) }));
            setArrowPosition(function (pre) {
                var _a;
                return (__assign(__assign({}, pre), { top: -(((_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) || 0) / 2, clipPath: "polygon(100% 0, 0 0, 50% 100%)" }));
            });
        }
        else {
            setPopoverPosition(__assign(__assign({}, popoverPosition), { show: true, left: -(((popoverBounding === null || popoverBounding === void 0 ? void 0 : popoverBounding.width) || 0) / 2 - (((_f = elementRef.current) === null || _f === void 0 ? void 0 : _f.clientWidth) || 0) / 2) -
                    (offsetLeftNeed > 0 ? offsetLeftNeed - (((_g = elementRef.current) === null || _g === void 0 ? void 0 : _g.clientWidth) || 1) / 2 : 0), top: ((_h = elementRef.current) === null || _h === void 0 ? void 0 : _h.clientHeight) || 0 }));
            setArrowPosition(function (pre) {
                var _a;
                return (__assign(__assign({}, pre), { top: ((_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight) || 0, clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }));
            });
        }
    };
    // useEffect
    React.useEffect(function () {
        var elementClickEvent = function (e) {
            var _a;
            if (!((_a = popoverRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
                if (popoverPosition.show) {
                    setPopoverPosition(function (pre) { return (__assign(__assign({}, pre), { show: false, left: 0, top: 0 })); });
                }
                else {
                    alignFromRight();
                }
            }
        };
        if (!!elementRef.current && !!popoverRef.current && !!arrowRef.current) {
            elementRef.current.addEventListener("click", elementClickEvent);
        }
        return function () {
            if (!!elementRef.current && !!popoverRef.current && !!arrowRef.current) {
                elementRef.current.removeEventListener("click", elementClickEvent);
            }
        };
    }, [elementRef.current, popoverRef.current, popoverPosition, arrowRef.current]);
    React.useEffect(function () {
        var windowsClickEvent = function (e) {
            var _a, _b;
            if (!((_a = elementRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) && !((_b = popoverRef.current) === null || _b === void 0 ? void 0 : _b.contains(e.target))) {
                setPopoverPosition(function (pre) { return (__assign(__assign({}, pre), { show: false, left: 0, top: 0 })); });
            }
        };
        window.addEventListener("click", windowsClickEvent);
        return function () {
            window.removeEventListener("click", windowsClickEvent);
        };
    }, [popoverRef.current, elementRef.current, popoverPosition]);
    React.useEffect(function () {
        var scrollWindow = function () {
            if (popoverPosition.show) {
                setPopoverPosition(function (pre) { return (__assign(__assign({}, pre), { show: false, left: 0, top: 0 })); });
            }
        };
        window.addEventListener("scroll", scrollWindow);
        return function () {
            window.removeEventListener("scroll", scrollWindow);
        };
    }, [popoverPosition]);
    return (React__default["default"].createElement("div", { ref: elementRef, style: {
            display: "inline-block",
            position: "relative",
        } },
        children,
        React__default["default"].createElement("div", { ref: popoverRef, style: {
                padding: "5px",
                position: "absolute",
                left: popoverPosition.left,
                top: popoverPosition.top,
                right: popoverPosition.right,
                bottom: popoverPosition.bottom,
                width: "".concat(popoverPosition.width, "px"),
                visibility: popoverPosition.show ? "visible" : "hidden",
                zIndex: popoverPosition.show ? "1" : "-9999999",
            } },
            React__default["default"].createElement("div", { style: {
                    marginTop: "5px",
                    padding: "5px",
                    backgroundColor: "#ffffff",
                    borderRadius: "2px",
                    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                } }, content)),
        React__default["default"].createElement("div", { ref: arrowRef, style: {
                visibility: popoverPosition.show ? "visible" : "hidden",
                zIndex: popoverPosition.show ? "1" : "-9999999",
                position: "absolute",
                left: arrowPosition.left,
                right: arrowPosition.right,
                top: arrowPosition.top,
                bottom: arrowPosition.bottom,
                width: 15,
                height: 15,
                clipPath: arrowPosition.clipPath,
                backgroundColor: "#ffffff",
                boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
            } })));
};

exports["default"] = Popover;
//# sourceMappingURL=index.js.map
