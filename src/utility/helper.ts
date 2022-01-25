import { Request } from "express";

export const ExtractIDFromURL = (url: string): string => {
  let arr = url.split("/");
  if (url.endsWith("/")) return arr[arr.length - 2];
  return arr[arr.length - 1];
};

// CM2FeetInch returns an object containing the value of CM to feet and inches
export const CM2FeetInch = (height: string): string => {

  if(isNaN(Number(height))) {
    return height
  }

  let ft = Number(height) * 0.0328084;
  let feet = Math.trunc(ft);

  let inch = ((ft - feet) * 12).toFixed(2);

  return `${feet}ft and ${inch} inches.`;
};

export const Paginate = (
  req: Request,
  totalItems: number,
  currentPage: number,
  pageSize: number
): Object => {
  let next = null;
  var url = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);
  var search_params = url.searchParams;

  const TotalPages = Math.ceil(totalItems / pageSize);

  if (currentPage < TotalPages) {
    search_params.set("page", (currentPage + 1).toString());
    url.search = search_params.toString();
    next = url.toString();
  }

  return { next, count: totalItems };
};
