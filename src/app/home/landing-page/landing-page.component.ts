import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {


  private scriptFiles: string[] = [
    '/assets/gem-dev/js/jquery.min.js',
    '/assets/gem-dev/js/bootstrap.min.js',
    '/assets/gem-dev/js/jquery.easing.min.js',
    '/assets/gem-dev/js/swiper.min.js',
    '/assets/gem-dev/js/jquery.magnific-popup.js',
    '/assets/gem-dev/js/scripts.js'
  ]
  constructor() { }

  ngOnInit() {
    this.loadScript()
  }

  public loadScript() {
    console.log('preparing to load...')

    for (let i in this.scriptFiles) {
      let node = document.createElement('script');
      node.src = this.scriptFiles[i];
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('body')[0].appendChild(node);
    }


  }

}
