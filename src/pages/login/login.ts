import { Component,} from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, App, ViewController, LoadingController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { AccountsPage } from '../accounts/accounts';
import { IntroductionPage } from '../introduction/introduction';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SenderInfoService } from '../../services/senderInfo';

@IonicPage({
  name: 'Login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userInformation = {}
  userError: String = "";
  errorCount = 0;
  userLoginForm: FormGroup;

  // For Selenium Testing
  selog_data:string = "";

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  class_options:string = 'contentBG';


  updateBG(event){
    //if( this.userLoginForm.controls["account"].value ){
      this.class_options = "contentBG filterHeavy";
    //}
  }

  updateBGBlur(event){
    this.class_options = "contentBG";
  }

  loginForm() {
    console.log(this.userInformation);
  }

  validation_messages = {
    'account': [
        { type: 'required', message: 'User ID is required.' },
        { type: 'minlength', message: 'Username must be equal to 16 characters long.' },
        { type: 'maxlength', message: 'Username must be equal to 16 characters long.' },
      ],
      'password': [
        { type: 'required', message: 'Password is required.' }
      ],
    }

  constructor(public loaderCtrl: LoadingController, private storage:Storage, private formBuilder: FormBuilder, public viewCtrl: ViewController, public app: App, private alert: AlertController, private menu: MenuController, public navCtrl: NavController, private senderService: SenderInfoService) {

   this.senderService.addUser(1234567898,"password","John", "Doe", "BRB","BRB","Bridgetown","Welches Hill");
   

    this.userLoginForm = new FormGroup({
      account: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.userInformation = formBuilder.group({
      account: ['', Validators.compose([
        Validators.maxLength(16), 
        Validators.minLength(16),
        Validators.pattern('[a-zA-Z ]*'), 
        Validators.required])
      ],
      password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.required])
      ],
    });

  }
  
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }

  openForgotPassword(){
    
    const alert = this.alert.create({
      title: 'Forgot Password!',
      subTitle: 'Please visit CIBC FirstCaribbean Online Banking website to reset your password.',
      buttons: [{
        text: 'OK',
        handler: data => {
          console.log('Cancel clicked');
        }
      }, {
        text: 'Visit Site',
        handler: data => {
          window.location.href = "https://www.cibc.com/fcib";
        }
      }]
    });
    alert.present();

  }

  goToAccount(){

    const loader = this.loaderCtrl.create({
      spinner: 'ios',
      content: "Authenticating...",
      duration: 3000
    });

    if( this.userLoginForm.controls["account"].valid && this.userLoginForm.controls["password"].valid && this.userLoginForm.controls["account"].value == "60250" && this.userLoginForm.controls["password"].value == "secure" ){
      
      // set a key/value
      this.storage.set('user_id', this.userLoginForm.controls["account"].value);
      this.storage.set('user_last_login', Date.now() );
      console.log('User Information Saved Successful');
      
      loader.present();
      this.selog_data = "PASS - LOGIN SUCCESSFUL";

      this.storage.get('introShown').then((result) => {
        
        // Show Loading Action
        setTimeout(() => {
          console.log('Login Successful');
          
          if(loader){
            loader.dismiss();
          }

          if(result){
            this.app.getRootNav().push(AccountsPage);
          } else {
            this.app.getRootNav().push(IntroductionPage);
            this.storage.set('introShown', true);
          }

          

        }, 3010);
        
      });

    }else{

      this.errorCount++;
      this.selog_data = "FAIL - INVALID USER CREDENTIALS";

      let invalidText = "Please enter you FCIB Account Credentials.";
      if( this.errorCount >= 2 ){
        invalidText = "Your credentials have been entered multiple times, would you like to reset your password. Please enter you FCIB Account Credentials.";
      }

      const alert = this.alert.create({
        title: 'Invalid Credentials!',
        subTitle: invalidText,
        buttons: [{
          text: 'OK',
          handler: data => {
            console.log('Cancel clicked');
          }
        }]
      });
      alert.present();

    }
  }

}
