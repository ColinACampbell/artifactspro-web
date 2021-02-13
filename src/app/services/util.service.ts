import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public getCurrentDate()
  {
    const date = new Date();
    let day = date.getDate() + '';
    let month = date.getMonth() + 1 + ''; // convert them to string by contacenating them to a string

    // convert the values to double digits if the are not
    if (day.length === 1)
      day = "0" + day;

    if (month.length === 1)
      month = "0" + month;

    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
  }

  assessFileSize(fileSize:number) : string
  {
    if ((fileSize / 1000) > 1000)
      return Math.floor(fileSize/1000000) + " Megabytes"
    else if (fileSize > 1000)
      return Math.floor(fileSize/1000) + " Kilobytes"
    
  }
}
