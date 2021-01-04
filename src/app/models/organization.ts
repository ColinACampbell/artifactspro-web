import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface Organization
{
  org_id : number, 
  name : string, 
  createdAt : Timestamp<number>, 
  type : string, 
  user_id : number
}