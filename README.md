# underscore.extend
在underscore的基础上，加了一些自己的方法

### _.try(func)
try,catch的封装，统一处理异常   
```js
_.try(function () {
    aa + bb;
});
```


### _.ease(template)(list)
定义一个模板方法，传入数组或伪数组，将他循环输出。
template里面约定：   
1. v - value 代表循环时当前的值    
2. k - key 代表循环时当前的索引   
3. l - list 代表传入的list   

```js
var arr1 = ['a', 'b', 'c'];
var str1 = _.ease('<div><%=k%>:<%=v%></div>')(arr1);
console.log(str1);
//<div>0:a</div><div>1:b</div><div>2:c</div>
```

```js
var arr2 = [{
    age: 12
}, {
    age: 14
}, {
    age: 15
}];
var str2 = _.ease('<div><%=v.age%></div>')(arr2);
console.log(str2);
//=><div>12</div><div>14</div><div>15</div>
```

```js
var arr3 = {
    0: {
        age: 12
    },
    1: {
        age: 14
    },
    2: {
        age: 16
    },
    length: 3,
    ok: 'fine'
};
var str3 = _.ease('<div><%=k%>:<%=v.age%>+<%=l.ok%></div>')(arr3);
console.log(str3);
//=><div>0:12+fine</div><div>1:14+fine</div><div>2:16+fine</div>
```

### _.fix2(Number | String)
如果是个位数，将在前面加0, 如1变成01，应用于时间，如12:00:00;
```js
var a1 = _.fix2(1);
var a2 = _.fix2('9');
var a3 = _.fix2(10);
var a4 = _.fix2(111);
console.log(a1, a2, a3, a4);
//=> 01 09 10 111
```

### _.summon(func)(list);
传入一个方法func, list里面的每一项值，都会执行func方法，将即结果返回为数组

```js
var arr = [1, -100, 0, -0];
arr = _.summon(Math.abs)(arr);
console.log(arr);
//=> [1, 100, 0, 0]
```

```js
var list = [0.111, 0.0001, 0.336, 0.225];
list = _.summon(function (num) {
    return num.toFixed(2);
})(list);
console.log(list);
// => ["0.11", "0.00", "0.34", "0.23"]
```

### _.god(object)(list)
传入一个对象object， 后面的list为对象上的方法名， 依次执行object的各个方法
```js
var arr = _.god(new Date())(['getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds']);
console.log(arr);
//=> [2015, 10, 14, 10, 38, 7]
```


### _.date(format)(time)
传入format返回一个方法，再传入时间，返回格式化后的字符
```js
var str = _.date('yyyy-MM-dd HH:mm:ss')(new Date());
console.log(str);
// => 2015-11-14 10:44:12
```

### _.curry2(func)
把一个普通方法变成柯里化2。
```js
function add(m, n) {
    return m + n;
}
var add5 = _.curry2(add)(5);
var a = add5(1);
console.log(a);
//=> 6
```
### _.sum(list)
求和
```js
var sum = _.sum([0.1, 0.2, 3, 4, 5]);
console.log(sum);
//=> 12.3
```

### _.avg(list)
求平均值
```js
var avg = _.avg([1, 2, 3, 4, 5, 0]);
console.log(avg);
//=> 2.5
```






