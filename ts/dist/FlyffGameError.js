"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlyffGameError = void 0;
class FlyffGameError extends Error {
    isFlyffGameError = true;
    sdk = 'FlyffGame';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.FlyffGameError = FlyffGameError;
//# sourceMappingURL=FlyffGameError.js.map