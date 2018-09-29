"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selfClosing = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
exports.isSelfClosing = (arg) => selfClosing.test(arg);
exports.isElement = (arg) => arg && arg.tag && arg.children;
exports.isComponent = (arg) => typeof arg === 'function';
exports.toSafeString = (arg) => arg !== true && arg !== false && arg != null
    ? exports.encodeEntities('' + arg)
    : '';
exports.encodeEntities = (arg) => arg.replace(/[<>&"]/g, c => `&#${c.charCodeAt(0)};`);
