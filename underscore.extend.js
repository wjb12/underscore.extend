_.extend(_, {
    try: function (callback) {
        try {
            callback.call(this);
        } catch (e) {
            alert(e);
        }
    },
    ease: function (template) {
        return function (list) {
            return _.reduce(list, function (memo, value, key, list) {
                return memo + _.template(template)({
                    v: value,
                    k: key,
                    l: list
                });
            }, '');
        }
    },
    fix2: function (str) {
        str = str.toString();
        if (str.length === 1) {
            str = ('0' + str).slice(-2);
        }
        return str;
    },
    summon: function (func) {
        return function (list) {
            return _.map(list, function (value) {
                return func.call(this, value);
            });
        }
    },
    god: function (obj) {
        return function (list) {
            return _.map(list, function (value) {
                return obj[value]();
            });
        }
    },
    date: function (format) {
        return function (time) {

            if (time.toString().length === 10) {
                time = time * 1000;
            }

            //神技, 传入一个对象，对象上的方法依次执行
            var arr = _.god(new Date(time))(['getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds']);
            arr[1] = arr[1] + 1;

            //传一个方法，每个数据都执行这个方法并返回
            arr = _.summon(_.fix2)(arr);

            return format.replace('yyyy', arr[0])
                .replace('MM', arr[1])
                .replace('dd', arr[2])
                .replace('HH', arr[3])
                .replace('mm', arr[4])
                .replace('ss', arr[5]);
        }
    },
    curry2: function (fun) {
        return function (arg2) {
            return function (arg1) {
                return fun(arg1, arg2);
            }
        }
    },
    sum: function (list) {
        return _.reduce(list, function (memo, value, key, list) {
            return memo + value;
        }, 0);
    },
    summary: function (list, key) {
        var obj = {};
        _.each(list, function (v, k) {
            if (!obj[v[key]]) {
                obj[v[key]] = {
                    length: 0
                };
            }
            var curr = obj[v[key]];
            curr.length++;
            _.each(v, function (vv, kk) {
                if (kk !== key) {
                    if (curr[kk] === undefined) {
                        curr[kk] = 0;
                    }
                    curr[kk] = curr[kk] + vv;
                }
            });
        });
        return obj;
    },
    avg: function (list) {
        return _.sum(list) / list.length;
    }
});