'use strict';

(function (root, factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.ellipsize = factory();
    }
}(this, function () { // jshint ignore:line
    var defaults = {
        ellipse: '…',
        chars: [' ', '-'],
        max: 140,
        truncate: true
    };

    function ellipsize(str, max, ellipse, chars, truncate) {
        var last = 0,
            c = '';

        if (str.length < max) return str;

        for (var i = 0, len = str.length; i < len; i++) {
            c = str.charAt(i);

            if (chars.indexOf(c) !== -1) {
                last = i;
            }

            if (i < max) continue;
            if (last === 0) {
                return !truncate ? '' : str.substring(0, max - 1) + ellipse;
            }

            return str.substring(0, last) + ellipse;
        }

        return str;
    }

    return function(str, max, opts) {
        if (typeof str !== 'string' || str.length === 0) return '';
        if (max === 0) return '';

        opts = opts || {};

        for (var key in defaults) {
            if (opts[key] === null || typeof opts[key] === 'undefined') {
                opts[key] = defaults[key];
            }
        }

        opts.max = max || opts.max;

        return ellipsize(str, opts.max, opts.ellipse, opts.chars, opts.truncate);
    };
}));

