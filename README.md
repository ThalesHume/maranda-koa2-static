#useage

npm i --save maranda-koa2-static

app.ts
```
import Koa from 'koa';
import {join as PathJoin} from 'path';

const app = new Koa();

//before other router middeware,
//if method is not 'head' or 'get' or path not in the start array,
//this middeware will call next function, else this middeware will return direct 
app.use(app.use(Koa2Static([
    {start:'/aa/',replace:'D:/xx/aa/'},
    {start:'/bb/',replace:'E:/cc/bb/'},
    {start: '/assets/', replace: PathJoin(__dirname, '..', 'assets')},
    ...
]))}

app.listen(80);
```
