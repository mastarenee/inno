import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

public profaddress = "#13 Lucky Lane, Warrens";
public profcity = "Bridgetown";
public profcountry = "Barbados";
public proftelephone = "12468102468";
public profemailaddress = "harry.lewis@gmail.com";


  constructor(public navCtrl: NavController,public navParams: NavParams) {
    
    let profaddress = this.navParams.get('profaddress');
  
     if ( profaddress !=null ) {
       this.profaddress = profaddress;
     }

      let profcity = this.navParams.get('profcity');
  
     if ( profcity !=null ) {
       this.profcity = profcity;
     }

     let profcountry = this.navParams.get('profcountry');
  
     if ( profcountry !=null ) {
       this.profcountry = profcountry;
     }

     let proftelephone = this.navParams.get('proftelephone');
  
     if ( proftelephone !=null ) {
       this.proftelephone = proftelephone;
     }

     let profemailaddress = this.navParams.get('profemailaddress');
  
     if ( profemailaddress !=null ) {
       this.profemailaddress = profemailaddress;
     }
  }


  selectAccount(event, accountsType) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(InfoPage, {
      item: accountsType 
    });
  }

  selectEditprofile(event, profaddress,profcity,profcountry,proftelephone,profemailaddress) {

    // That's right, we're pushing to ourselves!
    this.navCtrl.push(EditProfilePage, {
      profaddress:profaddress,
      profcity:profcity,
      profcountry:profcountry,
      proftelephone:proftelephone,
      profemailaddress:profemailaddress
    });
  }
}
