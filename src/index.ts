import { ParameterizedContext, Middleware } from 'koa';
import send from "koa-send";

interface StaticOptions extends send.SendOptions {
    root: string
    exclude?: RegExp[]
}
type notFoundPolicy<U, T> = (ctx: ParameterizedContext<U, T>) => Promise<void> | void;
function koa2Static<U, T>(folders: StaticOptions[], notFoundHandler?: notFoundPolicy<U, T>, defer?: boolean): Middleware<U, T> {
    if (!Array.isArray(folders)) { throw new TypeError('arg must be array'); }
    for (const folder of folders) {
        if (folder.exclude && !Array.isArray(folder.exclude)) { throw new TypeError('exclude must be array'); }
        if (!folder.root || typeof folder.root !== 'string') { throw new TypeError('folder root must be string'); }
        if (folder.exclude) {
            for (const reg of folder.exclude) {
                if (!(reg instanceof RegExp)) { throw new TypeError('exclude element must be RegExp'); }
            }
        }
    }
    if (notFoundHandler && typeof notFoundHandler !== 'function') { throw new TypeError('notFoundHandler must be function'); }
    if (defer && typeof defer !== 'boolean') { throw new TypeError('defer must be boolean'); }
    return async (ctx, next) => {
        if (ctx.method !== 'HEAD' && ctx.method !== 'GET') return next();
        if (folders.length === 0) return next();
        const path: string = decodeURI(ctx.request.path);
        if (defer) await next();
        if (defer && (ctx.body || ctx.status !== 404)) return;
        let i: number = 0;
        for (const folder of folders) {
            let exclude = true;
            if (folder.exclude && folder.exclude.length > 0) {
                for (const reg of folder.exclude) {
                    if (!reg.test(path)) { exclude = false; break; }
                }
            }
            if (!exclude) { i++; continue };
            try {
                await send(ctx, path, folder);
                break;
            } catch (err) {
                if (i !== folders.length - 1) { i++; continue; }
                if (err.status !== 404) throw err;
                if (err.status === 404 && notFoundHandler) await notFoundHandler(ctx);
            }
        }
    };
}
export default koa2Static;
export { koa2Static }