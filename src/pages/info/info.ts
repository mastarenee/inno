import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ReviewPage } from '../review/review';
import { AccountsPage } from '../accounts/accounts';
import { InfoAddressPage } from '../InfoAddress/InfoAddress';
import { PhoneValidator } from '../../services/phone.validator';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { TransactionServices } from '../../services/transaction.services'; 
import { ActionSheetController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';
import { trigger, style, animate, transition } from '@angular/animations';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@IonicPage({
  name: 'RecipientInformation'
})

@Component({
  selector: 'page-info',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateY(-100%)', opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: 'info.html'
})
export class InfoPage { 

  @ViewChild(Navbar) navBar: Navbar;
  
  public account;
  public masks:any;
  public phoneNumber: any = "";
  public account_selected_error:boolean = false;

  public account_selected;
  public account_id_selected;
  public account_selected_prev;
  public phone;
  public transaction = {};
  public accountslists = [];
  public valid_account_view = true;
  private myForm: FormGroup;
  public userRecipientBasicInformation: FormGroup;

  public myModel = '';
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  private recipient_errors = [{
    firstname_error: 'First Name is required',
    lastname_error: 'Last Name is required',
    tel_error: 'Telelphone is required',
    street_address_error: 'Street Address is required',
    account_error: 'Select an account',
    dob_error: 'A Date of Birth is required'
  }]


  constructor( private nativePageTransitions: NativePageTransitions, public actionSheetCtrl: ActionSheetController, public alert: AlertController, public transactionServices: TransactionServices, public storage: Storage, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    
    this.transactionServices.get("user_accounts_lists")
    .then(
      res => { // Success
        console.log(res);
        this.accountslists = res; 
      }
    );

    let account = this.navParams.get('account');
    let accountID = this.navParams.get('accountID');

    if( account ){
      this.account_selected = account;
      this.account_id_selected = accountID;
    }

    // Setup form fields
    this.userRecipientBasicInformation = new FormGroup({
      recipient_first_name: new FormControl(''),
      recipient_last_name: new FormControl(''),
      recipient_tel: new FormControl(''),
      recipient_nationality: new FormControl('GBR'),
      recipient_dob: new FormControl(''),
    });

    // Setup Validation for the fields
    this.userRecipientBasicInformation = this.formBuilder.group({
      recipient_first_name: ['', Validators.required],
      recipient_last_name: ['', Validators.required],
      recipient_tel: ['', Validators.required],
      recipient_nationality: ['GBR', Validators.required],
      recipient_dob: ['', Validators.required],
    });
  }

  selectAccount(){
    this.account_selected_prev = this.account_selected;
    this.account_selected = '';
  }

  showAccount(event){
    console.log("event",event);
    this.account = event;
    this.account_selected_error = false;
    this.valid_account_view = false;
  }

  accountSelected(event){
    console.log("event",event);
    this.account_selected_error = false;
  }

  formatTelephoneNumber(event){
    console.log(event);
    
    let tel = event.srcElement.value;
    if(tel.length+1 == 11){
      let USNumber = tel.match(/(\d{3})(\d{3})(\d{3})/);
      console.log(USNumber);
      USNumber = "(" + USNumber[1] + ") " + USNumber[2] + "-" + USNumber[3];
      this.userRecipientBasicInformation.controls["recipient_tel"].setValue( USNumber );
    }

  }

  radioChecked(index){
    //alert(index);
    this.account_id_selected = index;
  }

  nextPage(event, accountsType) {

    if( this.userRecipientBasicInformation.controls["recipient_first_name"].valid && 
    this.userRecipientBasicInformation.controls["recipient_last_name"].valid &&
    this.userRecipientBasicInformation.controls["recipient_tel"].valid &&
    this.userRecipientBasicInformation.controls["recipient_dob"].valid &&
    this.account_selected != ""){
          
      // Validate Information
      let firstname = this.userRecipientBasicInformation.controls["recipient_first_name"].value;
      let lastname = this.userRecipientBasicInformation.controls["recipient_last_name"].value;
      let tel = this.userRecipientBasicInformation.controls["recipient_tel"].value;
      let nationality = this.userRecipientBasicInformation.controls["recipient_nationality"].value;
      let dob = this.userRecipientBasicInformation.controls["recipient_dob"].value;
      
      this.transactionServices.set('firstname', firstname);
      this.transactionServices.set('lastname', lastname);
      this.transactionServices.set('tel', tel);
      this.transactionServices.set('nationality', nationality);
      this.transactionServices.set('account_name', this.account);
      this.transactionServices.set('dob', dob);
      this.transactionServices.set('transaction_in_progress', true);

      //alert(this.account_id_selected);

      this.nativePageTransitions.fade(null);
      this.navCtrl.push(InfoAddressPage, {
        firstname:firstname,
        lastname: lastname,
        tel:tel,
        nationality:nationality,
        account:this.account_selected,
        accountID: this.account_id_selected,
        dob: dob,
        accountList: this.accountslists,
      }); 

    }else{

      if(this.userRecipientBasicInformation.controls["recipient_first_name"].value == ''){
        this.userRecipientBasicInformation.controls.recipient_first_name.markAsTouched();
      }

      if(this.userRecipientBasicInformation.controls["recipient_last_name"].value == ''){
        this.userRecipientBasicInformation.controls.recipient_last_name.markAsTouched();
      }

      if(this.userRecipientBasicInformation.controls["recipient_tel"].value == ''){
        this.userRecipientBasicInformation.controls.recipient_tel.markAsTouched();
      }

      if(this.userRecipientBasicInformation.controls["recipient_nationality"].value == ''){
        this.userRecipientBasicInformation.controls.recipient_nationality.markAsTouched();
      }

      if(this.userRecipientBasicInformation.controls["recipient_dob"].value == ''){
        this.userRecipientBasicInformation.controls.recipient_dob.markAsTouched();
      }

      if( this.account_selected == ""){
        this.account_selected_error = true;
      }

    }

  }

  ionViewDidLoad() {

    this.transactionServices.get("transaction_in_progress")
    .then(
      res => { // Success
        if(res == true){
          
          this.transactionServices.get('firstname').then(res => {
            this.userRecipientBasicInformation.controls["recipient_first_name"].setValue(res);
          });

          this.transactionServices.get('lastname').then(res => {
            this.userRecipientBasicInformation.controls["recipient_last_name"].setValue(res);
          });

          this.transactionServices.get('tel').then(res => {
            this.userRecipientBasicInformation.controls["recipient_tel"].setValue(res);
          });

          this.transactionServices.get('nationality').then(res => {
            this.userRecipientBasicInformation.controls["recipient_nationality"].setValue(res);
          });

          this.transactionServices.get('account_name').then(res => {
            this.account_selected = res;
          });

          this.transactionServices.get('dob').then(res => {
            this.userRecipientBasicInformation.controls["recipient_dob"].setValue(res);
          });
         
        }

    });
    

    this.navBar.backButtonClick = (e:UIEvent)=>{
     // todo something
     this.cancelPage();
    }
  }

  cancelPage(){

    const alert = this.alert.create({
      title: 'Cancel Transaction!',
      subTitle: 'Are you sure you want to cancel this transaction?.',
      buttons: [{
        text: 'Yes',
        handler: data => {
          this.navCtrl.push(AccountsPage);
        }
      }, {
        text: 'Cancel',
        handler: data => {
          // Do Nothing
        }
      }]
    });
    alert.present();

    
  }

}
