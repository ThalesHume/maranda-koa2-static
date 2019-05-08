"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mime_1 = require("mime");
const mz_1 = require("mz");
const path_1 = require("path");
function Koa2Static(Ops) {
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (ctx.method !== 'HEAD' && ctx.method !== 'GET') {
                throw `next`;
            }
            let f = decodeURI(ctx.request.path), isStatic = false;
            for (const op of Ops) {
                if (f.startsWith(op.start)) {
                    f = path_1.join(op.replace, f.replace(op.start, ''));
                    isStatic = true;
                    break;
                }
            }
            if (!isStatic) {
                throw `next`;
            }
            ctx.response.body = yield mz_1.fs.readFile(f);
            ctx.response.type = mime_1.getType(f);
        }
        catch (error) {
            if (error == `next`) {
                yield next();
            }
            else {
                ctx.response.status = 404;
            }
        }
    });
}
exports.default = Koa2Static;
