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
}
