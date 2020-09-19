export class Environment {

    private url: String;
    private prod: boolean = false; // make this is always false when testing

    constructor() {
        let isNextworked = true;
        const urlLocal = isNextworked ? "http://192.168.100.192:3000/" : 'http://localhost:3000/' 
        this.url = this.prod ? "https://artifactspro.herokuapp.com/" : urlLocal; 
    }

    public baseURL() : String
    {
        return this.url;
    }

}