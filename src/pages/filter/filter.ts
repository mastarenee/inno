import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  email: string = this.navParams.get('email');
  public type;
  public startDate;
  public endDate;

  status: any = 'completed';
  
  formSettings = {
      theme: 'ios'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,params: NavParams,public viewCtrl: ViewController ) {
    console.log('UserId', params.get('userId'));
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }
  
  closeModal() {
    let data = { 'start_date': this.startDate, 'end_date': this.endDate, 'type':this.type };
    this.viewCtrl.dismiss(data);
  }
}
