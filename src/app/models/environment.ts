export class Environment {

    private url: String;
    private prod: boolean = true; // make this is always false when testing

    constructor() {
        this.url = this.prod ? "https://artifactspro.herokuapp.com/" : 'http://localhost:3000/'; 
    }

    public baseURL() : String
    {
        return this.url;
    }

}