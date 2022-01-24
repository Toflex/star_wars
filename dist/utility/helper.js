"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginate = exports.CM2FeetInch = exports.ExtractIDFromURL = void 0;
const ExtractIDFromURL = (url) => {
    let arr = url.split("/");
    if (url.endsWith("/"))
        return arr[arr.length - 2];
    return arr[arr.length - 1];
};
exports.ExtractIDFromURL = ExtractIDFromURL;
// CM2FeetInch returns an object containing the value of CM to feet and inches
const CM2FeetInch = (height) => {
    let ft = height * 0.0328084;
    let feet = Math.trunc(ft);
    let inch = ((ft - feet) * 12).toFixed(2);
    return `${feet}ft and ${inch} inches.`;
};
exports.CM2FeetInch = CM2FeetInch;
const Paginate = (req, totalItems, currentPage) => {
    let next = req.protocol + "://" + req.get("host") + req.path;
    const query = req.query;
    const TotalPages = Math.round(totalItems / currentPage);
    if (currentPage < TotalPages) {
        next += "?";
        for (var x in query) {
            if (x === "page") {
                next += `page=${currentPage + 1}`;
            }
            else {
                next += `${x}=${query[x]}`;
            }
        }
    }
    else {
        next = null;
    }
    return { next, count: totalItems };
};
exports.Paginate = Paginate;
//# sourceMappingURL=helper.js.map