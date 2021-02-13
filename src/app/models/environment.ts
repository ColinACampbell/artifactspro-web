export class Environment {

    private url: String;
    private prod: boolean = false; // make this is always false when testing

    constructor() {
        let isNextworked = false;
        const urlLocal = isNextworked ? "http://192.168.100.192:3000/" : 'http://localhost:3000/' 
        this.url = this.prod ? "https://artifacts-pro.uc.r.appspot.com/" : urlLocal; 
    }

    public baseURL() : String
    {
        return this.url;
    }

}