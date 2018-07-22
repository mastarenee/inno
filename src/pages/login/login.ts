import { Component,} from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, App, ViewController, LoadingController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { AccountsPage } from '../accounts/accounts';
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
  userLoginForm: FormGroup;

  // For Selenium Testing
  selog_data:string = "";

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

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

        if( this.userLoginForm.controls["account"].valid && this.userLoginForm.controls["password"].valid ){
          
          // set a key/value
          this.storage.set('user_id', this.userLoginForm.controls["account"].value);
          this.storage.set('user_last_login', Date.now() );
          console.log('User Information Saved Successful');
          
          loader.present();
          this.selog_data = "PASS - LOGIN SUCCESSFUL";

          // Show Loading Action
          setTimeout(() => {
            console.log('Login Successful');
            this.app.getRootNav().push(AccountsPage);
          }, 3010);

        }else{

          this.selog_data = "FAIL - INVALID USER CREDENTIALS";
    
          const alert = this.alert.create({
            title: 'Invalid Credentials!',
            subTitle: 'Please enter you FCIB Account Credentials.',
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
