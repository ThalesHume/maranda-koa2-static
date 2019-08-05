"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_send_1 = __importDefault(require("koa-send"));
function koa2Static(folders, notFoundHandler, defer) {
    if (!Array.isArray(folders)) {
        throw new TypeError('arg must be array');
    }
    for (const folder of folders) {
        if (folder.exclude && !Array.isArray(folder.exclude)) {
            throw new TypeError('exclude must be array');
        }
        if (!folder.root || typeof folder.root !== 'string') {
            throw new TypeError('folder root must be string');
        }
        if (folder.exclude) {
            for (const reg of folder.exclude) {
                if (!(reg instanceof RegExp)) {
                    throw new TypeError('exclude element must be RegExp');
                }
            }
        }
    }
    if (notFoundHandler && typeof notFoundHandler !== 'function') {
        throw new TypeError('notFoundHandler must be function');
    }
    if (defer && typeof defer !== 'boolean') {
        throw new TypeError('defer must be boolean');
    }
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        if (ctx.method !== 'HEAD' && ctx.method !== 'GET')
            return next();
        if (folders.length === 0)
            return next();
        const path = decodeURI(ctx.request.path);
        if (defer)
            yield next();
        if (defer && (ctx.body || ctx.status !== 404))
            return;
        let i = 0;
        for (const folder of folders) {
            let exclude = true;
            if (folder.exclude && folder.exclude.length > 0) {
                for (const reg of folder.exclude) {
                    if (!reg.test(path)) {
                        exclude = false;
                        break;
                    }
                }
            }
            if (!exclude) {
                i++;
                continue;
            }
            ;
            try {
                yield koa_send_1.default(ctx, path, folder);
                break;
            }
            catch (err) {
                if (i !== folders.length - 1) {
                    i++;
                    continue;
                }
                if (err.status !== 404)
                    throw err;
                if (err.status === 404 && notFoundHandler)
                    yield notFoundHandler(ctx);
            }
        }
    });
}
exports.koa2Static = koa2Static;
exports.default = koa2Static;
