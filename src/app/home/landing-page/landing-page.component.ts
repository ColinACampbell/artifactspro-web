import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  private contactForm : FormGroup;

  private scriptFiles: string[] = [
    '/assets/gem-dev/js/jquery.min.js',
    '/assets/gem-dev/js/jquery.easing.min.js',
    '/assets/gem-dev/js/jquery.magnific-popup.js',
    '/assets/gem-dev/js/swiper.min.js',
    '/assets/gem-dev/js/bootstrap.min.js',
    '/assets/gem-dev/js/scripts.js'
  ]
  constructor(
    private snackBar : MatSnackBar,
    private emailService : EmailService
  ) { }

  async ngOnInit(){ 
    this.loadScript()
    this.contactForm = new FormGroup({
      senderName : new FormControl("senderName",[Validators.required]),
      senderEmail : new FormControl("senderEmail",[Validators.required]),
      senderMessage : new FormControl("senderMessage",[Validators.required])
    })
  }

  public loadScript() {
    console.log('preparing to load...')

    for (let i in this.scriptFiles) {
      let node = document.createElement('script');
      node.src = this.scriptFiles[i];
      node.type = 'text/javascript';
      node.defer = true;
      //node.charset = 'utf-8';
      document.getElementsByTagName('body')[0].appendChild(node);
    }
  }

  get contactSenderName()
  {
    return this.contactForm.get('senderName')
  }

  get contactSenderEmail()
  {
    return this.contactForm.get('senderEmail')
  }

  get contactSenderMessage()
  {
    return this.contactForm.get('senderMessage')
  }

  public sendEmail(senderName: string, senderEmail: string, senderMessage:string)
  {
    if (senderName.trim().length === 0
      || senderEmail.trim().length === 0
      || senderMessage.trim().length === 0)
      {
        this.snackBar.open('None of the fields can be empty','Okay')
        return;
      }

    // Validate email next
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(senderEmail))
    {
      this.snackBar.open("Please sender a valid email address","Okay")
      return;
    } else {
      this.emailService.sendEmailQuery(senderName,senderEmail,senderMessage)
      .subscribe((response: HttpResponse<Object>)=>{
        if (response.status === 200)
          this.snackBar.open("We have recieved your message. We will reply soon","Okay")
      },(err)=>{
        this.snackBar.open("Looks like something went wrong in sending this message. Please try again later","Okay")
      })

    }
  }
  
}
