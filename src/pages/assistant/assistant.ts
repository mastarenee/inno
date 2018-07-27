import { Component, NgZone, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
//import { TextToSpeech } from '@ionic-native/text-to-speech';
import { InfoPage } from '../info/info';
import { TransactionHistoryPage } from '../transactionhistory/transactionhistory';
import { ProfilePage } from '../profile/profile';
import { ContactPage } from '../contact/contact';

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
    });
    this.content.scrollToBottom(200);


   //clear input field
   this.text="";
   let pageName;

    window["ApiAIPlugin"].requestText({
      query:message
    },(res)=>{

      this.ngZone.run(()=>{
        this.messages.push({
          text:res.result.fulfillment.speech,
          sender:"api"
        });
        this.content.scrollToBottom(200);
        pageName = res.result.fulfillment.speech;

        this.pushPage(pageName);
        
      })
    },(err)=>{
      alert(JSON.stringify(err))
    });
  }

  pushPage(pageName){

    switch(pageName){
      case "InfoPage":{
      this.navCtrl.push(InfoPage); 
      break;
      }

      case "TransactionHistoryPage":{
      this.navCtrl.push(TransactionHistoryPage);
      break;
      }

      case "ProfilePage":{
      this.navCtrl.push(ProfilePage);
      break;
      }


      case "ContactPage":{
      this.navCtrl.push(ContactPage);
      break;
      }

      default:
    
      break;
      
    }
  }

  sendVoiceMessage(){
    let pageName;

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

        pageName = res.result.fulfillment.speech;
        

        this.content.scrollToBottom(200);
      
      this.pushPage(pageName);
    })

      },
      (err)=>{
        alert(err);
      }
      )

     
    }

}
