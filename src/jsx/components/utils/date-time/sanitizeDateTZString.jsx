import {stringYMDHyphenatedToDate} from "./stringYMDHyphenatedToDate";

export function sanitizeDateTZString(dateIn){
    let dt = new stringYMDHyphenatedToDate(dateIn);
    return `${dt.getUTCFullYear()}-${dt.getUTCMonth()+1}-${dt.getUTCDate()}`;
}