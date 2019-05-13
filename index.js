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
function default_1(Opts) {
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (ctx.method !== 'HEAD' && ctx.method !== 'GET') {
                throw `next`;
            }
            let f = decodeURI(ctx.request.path), isStatic = false, index = 'index.html';
            for (const opt of Opts) {
                if (f.startsWith(opt.start)) {
                    if (opt.exclude) {
                        opt.exclude.forEach((reg) => { if (reg.test(f)) {
                            throw `next`;
                        } });
                    }
                    f = path_1.join(opt.rootDir, f.replace(opt.start, ''));
                    index = opt.default || index;
                    isStatic = true;
                    break;
                }
            }
            if (!isStatic) {
                throw `next`;
            }
            let stat = mz_1.fs.statSync(f);
            if (stat.isDirectory()) {
                f = path_1.join(f, index);
            }
            ctx.body = mz_1.fs.createReadStream(f);
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
exports.default = default_1;
