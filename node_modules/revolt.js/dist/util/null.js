"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNullableDate = exports.toNullable = void 0;
function toNullable(data) {
    return typeof data === "undefined" ? null : data;
}
exports.toNullable = toNullable;
function toNullableDate(data) {
    return typeof data === "undefined" ? null : new Date(data.$date);
}
exports.toNullableDate = toNullableDate;
