# underscore.extend
在underscore的基础上，加了一些自己的方法

### each   _.try(func)
try,catch的封装，统一处理异常   
```js
_.try(function () {
    aa + bb;
});
```


### ease   _.ease(template)(list)
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
