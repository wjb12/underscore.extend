_.extend(_, {
    try: function (callback) {
        try {
            callback.call(this);
        } catch (e) {
            alert(e);
        }
    }
});

_.extend(_, {
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
    }
});

_.extend(_, {
    fix2: function (str) {
        str = String(str);
        if (str.length === 1) {
            str = '0' + str;
        }
        return str.slice(-str.length);
    }
});

_.extend(_, {
    //召唤
    summon: function (func) {
        return function (list) {
            return _.map(list, function (value) {
                return func.call(this, value);
            });
        }
    }
});

_.extend(_, {
    //神技
    god: function (obj) {
        return function (list) {
            return _.map(list, function (value) {
                return obj[value]();
            });
        }
    }
});

_.extend(_, {
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

var out = _.date('yyyy-MM-dd HH:mm:ss')(new Date());
console.log(out);

var arr = [1, 2, 3, 4, 5];
var str = _.ease('<div><%=v%></div>')(arr);
console.log(str);


var a = {
    0: 'aaa',
    1: 'bbb',
    2: 'ccc',
    length: 3
};


var aa = _.toArray(a);

console.log(aa);