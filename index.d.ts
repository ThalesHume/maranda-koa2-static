import {ParameterizedContext} from 'koa';
export interface StaticOps{
    start: string,
    rootDir: string,
    default?: string,
    exclude?: RegExp[]
}
export default function (Ops:StaticOps[]): (ctx:ParameterizedContext, next:()=>Promise<any>)=> any