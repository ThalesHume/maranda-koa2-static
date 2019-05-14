# useage

##### npm i --save maranda-koa2-static

### for the complete maranda koa server case, with static, session-mysql, koabody, router

### please visit https://github.com/yu87109/maranda-koa-server-example

### this example is used for ts, if you are js user, if can use as almost the same, just delete the type define.

app.ts
```typescript
import Koa from 'koa';
import Koa2Static from 'maranda-koa2-static';
import {join} from 'path';

const app = new Koa();

//strong recommond that user this middleware before other router middeware,
//if ctx.method is not 'head' or 'get' or ctx.path not in the start array or ctx.path match the exclue array, this middeware will call next function, else this middeware will return the static file direct 
app.use(Koa2Static([
    {start: '/FileBank/', rootDir: 'D:/aa/FileBank'},
    {start: '/assets/', rootDir: join(__dirname, '..', 'assets'), exclude:[/a.text$/]},
    ...
]))
app.listen(80);
```

---

[for more Versions, click see the changelog](./CHANGELOG.MD)

