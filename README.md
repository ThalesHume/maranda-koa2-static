# useage

##### npm i --save maranda-koa2-static

### this example is used for ts, if you are js user, if can use as almost the same, just delete the type define.

app.ts
```typescript
import Koa from 'koa';
import Koa2Static from 'maranda-koa2-static';
import {join as pathJoin} from 'path';

const app = new Koa();

app.use(Koa2Sataic<any, Ctx>([
  { root: filePath },
  { root: pathJoin(__dirname, '../../client/dist/web'), exclude: [/^\/graphql$/] }
], (ctx) => {
  ctx.body = 'not found'
}, true));
app.listen(80);
```

---

[for more Versions, click see the changelog](./CHANGELOG.MD)

