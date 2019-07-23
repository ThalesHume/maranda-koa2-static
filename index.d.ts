import { ParameterizedContext, Middleware } from 'koa';
import send from "koa-send";
interface StaticOptions extends send.SendOptions {
    root: string;
    exclude?: RegExp[];
}
declare type notFoundPolicy<U, T> = (ctx: ParameterizedContext<U, T>) => Promise<void> | void;
declare function koa2Static<U, T>(folders: StaticOptions[], notFoundHandler?: notFoundPolicy<U, T>, defer?: boolean): Middleware<U, T>;
export default koa2Static;
export { koa2Static };
