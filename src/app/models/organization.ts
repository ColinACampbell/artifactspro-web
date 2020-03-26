export class Organization
{
    /**
        "organization": {
            "user_id": "20",
            "org_id": 9,
            "name": "My Business",
            "type": "",
            "org_key": "my_business",
            "org_code": "af1e2f2eb7852227fa837a65b97ea061b892ca3b0a79df37f6478dbd010db421"
        }
    **/
   
  private owner:String;
  private orgID:number;
  private name:String;
  private code:String;
  private key:String;
  private type:String;

  constructor(params : any)
  {

    console.log("In model")
    
    this.owner = params.user_id;
    this.orgID = params.org_id;
    this.type = params.type;
    this.name = params.name;
    this.key = params.org_key;
    this.code = params.org_code;
  }

  public getName() : String
  {
    return this.name;
  }

}