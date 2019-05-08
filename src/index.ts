import {getType} from 'mime';
import {ParameterizedContext} from 'koa';
import {fs} from 'mz';
import {join as PathJoin} from 'path';

interface StaticOps{
    start: string,
    replace: string,
}
export default function Koa2Static(Ops:StaticOps[]){
    return async (ctx:ParameterizedContext, next:()=>Promise<any>) => {
        try {
            if (ctx.method !== 'HEAD' && ctx.method !== 'GET') {throw `next`;}
            let f = decodeURI(ctx.request.path), isStatic = false;
            for (const op of Ops) {
                if(f.startsWith(op.start)){
                    f = PathJoin(op.replace, f.replace(op.start, ''));
                    isStatic = true;
                    break;
                }
            }
            if (!isStatic) {throw `next`}
            ctx.response.body = await fs.readFile(f);
            ctx.response.type = <string>getType(f);
        } catch (error) {
            if (error == `next`) {
                await next();
            } else {
                ctx.response.status = 404;
            }
        }
    }
}