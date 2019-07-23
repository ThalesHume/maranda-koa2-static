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

+ maxage Browser cache max-age in milliseconds.(defaults to 0)
+ immutable Tell the browser the resource is immutable and can be cached indefinitely. (defaults to false)
+ hidden Allow transfer of hidden files. (defaults to false)
+ root Root directory to restrict file access.
+ index Name of the index file to serve automatically when visiting the root location. (defaults to none)
+ gzip Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. (defaults to true).
+ brotli Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists. (defaults to true).
+ format If not false (defaults to true), format the path to serve static file servers and not require a trailing slash for directories, so that you can do both /directory and /directory/.
+ setHeaders Function to set custom headers on response.
+ extensions Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to false)
---

[for more Versions, click see the changelog](./CHANGELOG.MD)

