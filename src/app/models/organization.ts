import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface Organization
{
  org_id : number, 
  name : string, 
  createdAt : Timestamp<number>, 
  type : string, 
  user_id : number,
  address_line_1:string,
  address_line_2:string,
  phone_line_1:string,
  phone_line_2:string,
}