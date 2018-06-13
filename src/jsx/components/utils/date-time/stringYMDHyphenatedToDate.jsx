export function stringYMDHyphenatedToDate(inStr, localTimeZone=false){
    let date = new Date();

    let parsedStr = inStr.split("-");


    if (localTimeZone === true){
        date.setFullYear(parsedStr[0]);
        date.setMonth(parsedStr[1]-1); // Remember, JS months are zero-indexed!!!
        date.setDate(parsedStr[2]);
        date.setHours(0,0,0);

        return date;
    }

    date.setUTCFullYear(parsedStr[0]);
    date.setUTCMonth(parsedStr[1]-1); // Remember, JS months are zero-indexed!!!
    date.setUTCDate(parsedStr[2]);
    date.setUTCHours(0,0,0);
    return date;

}