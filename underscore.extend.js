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

            format = format.replace('yyyy', arr[0])
                .replace('MM', arr[1])
                .replace('dd', arr[2])
                .replace('HH', arr[3])
                .replace('mm', arr[4])
                .replace('ss', arr[5]);

            return format;
        }
    }
});