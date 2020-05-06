export class Environment {

    private url: String;
    private prod: boolean = false; // make this is always false when testing

    constructor() {
        this.url = this.prod ? "https://artifactspro.herokuapp.com/" : 'http://localhost:3000/'; 
        //console.log(this.url)
    }

    public baseURL() : String
    {
        return this.url;
    }

}