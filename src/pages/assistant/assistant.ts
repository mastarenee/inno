import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//used to access api.ai
declare var window;

@IonicPage()
@Component({
  selector: 'page-assistant',
  templateUrl: 'assistant.html',
})
export class AssistantPage {

  messages: any[] = [];
  text: string ="";

  constructor(public navCtrl: NavController, public navParams: NavParams, public ngZone:NgZone) {
    this.messages.push({
      text: "Hey Harry, how can I help you?",
      sender:"api"
    }) 
  }

  sendTextMessage(){
   let message = this.text;
    this.messages.push({
      text: message,
      sender:"user"
    }) 

   //clear input field
   this.text="";

    window["ApiAIPlugin"].requestText({
      query:message
    },(res)=>{

      this.ngZone.run(()=>{
        this.messages.push({
          text:res.result.fulfillment.speech,
          sender:"api"
        });
      })
    },(err)=>{
      alert(JSON.stringify(err))
    })
  }

  

}
