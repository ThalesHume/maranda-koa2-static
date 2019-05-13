import {getType} from 'mime';
import {ParameterizedContext} from 'koa';
import {fs} from 'mz';
import {join as PathJoin} from 'path';

interface StaticOps{
    start: string,
    rootDir: string,
    default?: string,
    exclude?: RegExp[]
}
export default function (Opts:StaticOps[]){
    return async (ctx:ParameterizedContext, next:()=>Promise<any>) => {
        try {
            if (ctx.method !== 'HEAD' && ctx.method !== 'GET') {throw `next`;}
            let f = decodeURI(ctx.request.path), isStatic = false, index = 'index.html';
            for (const opt of Opts) {
                if(f.startsWith(opt.start)){
                    if(opt.exclude){opt.exclude.forEach((reg)=>{if(reg.test(f)){throw `next`;}})}
                    f = PathJoin(opt.rootDir, f.replace(opt.start, ''));
                    index = opt.default || index;
                    isStatic = true;
                    break;
                }
            }
            if (!isStatic) {throw `next`}
            let stat = fs.statSync(f);
            if(stat.isDirectory()){f = PathJoin(f, index)}
            ctx.body =  fs.createReadStream(f);
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