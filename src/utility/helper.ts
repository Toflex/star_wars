import { Request } from "express";
import url from "url";

export const ExtractIDFromURL = (url: string): string => {
  let arr = url.split("/");
  if (url.endsWith("/")) return arr[arr.length - 2];
  return arr[arr.length - 1];
};

// CM2FeetInch returns an object containing the value of CM to feet and inches
export const CM2FeetInch = (height: number): string => {
  let ft = height * 0.0328084;
  let feet = Math.trunc(ft);

  let inch = ((ft - feet) * 12).toFixed(2);

  return `${feet}ft and ${inch} inches.`;
};

export const Paginate = (
  req: Request,
  totalItems: number,
  currentPage: number
): Object => {
  let next = req.protocol + "://" + req.get("host") + req.path;
  const query = req.query;

  const TotalPages = Math.round(totalItems / currentPage);

  if(currentPage < TotalPages){
      next+= "?"
  for (var x in query) {
    if (x === "page") {
      next += `page=${currentPage + 1}`;
    } else {
        next += `${x}=${query[x]}`
    }
  }
} else {
    next = null
}

  return { next, count: totalItems };
};
