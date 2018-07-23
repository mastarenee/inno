import { Component, NgZone, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';


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
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ngZone:NgZone, public tts:TextToSpeech) {
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
    });
    this.content.scrollToBottom(200);


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
        this.content.scrollToBottom(200);
      })
    },(err)=>{
      alert(JSON.stringify(err))
    })
  }

  sendVoiceMessage(){
    window["ApiAIPlugin"].requestVoice({},
    (res)=>{
      this.ngZone.run(()=>{
        this.messages.push({
          text:res.result.resolvedQuery,
          sender:"user"
        });

        this.messages.push({
          text:res.result.fulfillment.speech,
          sender:"api"
        });
        this.content.scrollToBottom(200);
      this.tts.speak({
        text: res.result.fulfillment.speech,
        locale: "en_US",
        rate:1
      })
    })
      },
      (err)=>{
        alert(err);
      }
      )
    }

}
