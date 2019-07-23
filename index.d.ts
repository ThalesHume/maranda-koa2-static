import { ParameterizedContext } from 'koa';
import send from "koa-send";
interface StaticOptions extends send.SendOptions {
    root: string;
    exclude?: RegExp[];
}
declare type notFoundPolicy = (ctx: ParameterizedContext) => Promise<void> | void;
export default function (folders: StaticOptions[], notFoundHandler?: notFoundPolicy, defer?: boolean): (ctx: ParameterizedContext<any, {}>, next: Function) => Promise<any>;
export {};
