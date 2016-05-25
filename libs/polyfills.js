/**
 * Created by Naveed-ul-Hassan Malik on 8/26/2015.
 * This file extends basic javascript objects
 */
String.prototype.capitalize = function () {
    return this.replace(
        /\w\S*/g,
        function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}
    );
};

Number.prototype.isBetween = function (min, max, notInclusive) {
    if( notInclusive ){
        return this > min && this < max;
    }
    return this >= min && this <= max;
};

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
        var k;

        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var O = Object(this);

        var len = O.length >>> 0;

        if (len === 0) {
            return -1;
        }

        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }

        if (n >= len) {
            return -1;
        }

        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        while (k < len) {
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function (value) {
        var index = this.indexOf(value);
        if (index != -1) this.splice(index, 1);
    };
}

if (!Array.prototype.removeWhere) {
    Array.prototype.removeWhere = function (callback) {
        var items = this.filter(callback);
        for( var $i = 0; $i < items.length; $i ++ ){
            this.remove(items[$i]);
        }
    };
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun/*, thisArg*/) {
        'use strict';

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];

                // NOTE: Technically this should Object.defineProperty at
                //       the next index, as push can be affected by
                //       properties on Object.prototype and Array.prototype.
                //       But that method's new, and collisions should be
                //       rare, so use the more-compatible alternative.
                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
}

if (!Array.prototype.forEach) {

    Array.prototype.forEach = function (callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }

        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If isCallable(callback) is false, throw a TypeError
        exception. // See: http://es5.github.com/#x9.11
            if(typeof callback !== "function")
        {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

            var kValue;

            // a. Let Pk be ToString(k).
            //    This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty
            //    internal method of O with argument Pk.
            //    This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal
                // method of O with argument Pk.
                kValue = O[k];

                // ii. Call the Call internal method of callback with T as
                // the this value and argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined
    };
}

Array.prototype.findOne = function (callback) {
    var result = this.filter(callback);
    if( result.length > 0 ) return result[0];
    return null;
};

Array.prototype.hasItem = function (item) {
    return this.indexOf(item) !== -1;
};

/*
* Get date or datetime from a string like:
* '2016-05-01 12:48:59' or '2016-05-01'
* */
Date.fromStr = function (dateStr) {
    var dateTime = dateStr.split(" ");
    var datePart = dateTime[0];
    var dateArr = datePart.split("-");
    var y = parseInt(dateArr[0]);
    var m = parseInt(dateArr[1]) - 1;
    var d = parseInt(dateArr[2]);
    var h = 0, min = 0, s = 0;
    if( dateTime.length > 1 ) {
        var timePart = dateTime[1];
        var timeArr = timePart.split(":");
        h = parseInt(timeArr[0]);
        min = parseInt(timeArr[1]);
        s = parseInt(timeArr[2]);
        return new Date(y, m, d, h, min, s);
    }
    return new Date(y, m, d);

};

Date.prototype.mySqlFormat = function () {
    var dd = this.getDate();
    var mm = this.getMonth()+1; //January is 0!
    var yyyy = this.getFullYear();

    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;

    return yyyy+'-'+mm+'-'+dd;
};

Date.prototype.isFutureDate = function () {
    var diff = this - new Date( Date.now() + 5*60*60*1000 );
    return diff > 0;
};

Date.monthsList = function (objects) {
    if(objects)
        return [{id: 1, month: 'January'}, {id: 2, month: 'February'}, {id: 3, month: 'March'}, {id: 4, month: 'April'}, {id: 5, month: 'May'}, {id: 6, month: 'June'}, {id: 7, month: 'July'}, {id: 8, month: 'August'}, {id: 9, month: 'September'}, {id: 10, month: 'October'}, {id: 11, month: 'November'}, {id: 12, month: 'December'}];
    return ['January','February','March','April','May','June', 'July','August','September','October','November','December'];
};