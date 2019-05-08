import {ParameterizedContext} from 'koa';

export interface StaticOps{
    start: string,
    replace: string,
}
export default function Koa2Static(Ops:StaticOps[]):any