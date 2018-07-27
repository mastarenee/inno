import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
//npm install chart.js

/**
 * Generated class for the AccountsactivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accountsactivity',
  templateUrl: 'accountsactivity.html',
})
export class AccountsactivityPage {

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any; 

  public accountslists = [
    {
        alias: 'House Savings',
        amount: '9800000',
        account_num: '7402',
        selected: true,
        chartSet: [65, 59, 80, 81, 56, 55, 40],
    },
    {
        alias: 'Investment Savings',
        amount: '8000',
        account_num:'3833',
        selected: false,
        chartSet: [65, 159, 180, 181, 180, 190, 200],
    },
    {
        alias: 'Business Savings',
        amount: '12000',
        account_num:'8763',
        selected: false,
        chartSet: [165, 169, 180, 171, 170, 180, 170],
    }
  ]

  public transactionLists = [
    {
      name: 'POS Withdrawal',
      date: 'July 6th 2018',
      amount: '$50.00',
      amount_left: '$7,102.00',
      icon: 'left-down-arrow-curve.png',
      type: '3833',
    },
    {
      name: 'Massy Supermarkets',
      date: 'July 6th 2018',
      amount: '$300.00',
      amount_left: '$7,402.00',
      icon: 'arrow-curve-pointing-to-right.png',
      type: '7402',
    },
    {
      name: 'Wire Transfer',
      date: 'July 5th 2018',
      amount: '$300.00',
      amount_left: '$7,402.00',
      icon: 'icon_transfer.png',
      type: '7402',
    },
    {
      name: 'Rubis Wildey Gas Station',
      date: 'July 3rd 2018',
      amount: '$150.00',
      amount_left: '$7,402.00',
      icon: 'arrow-curve-pointing-to-right.png',
      type: '8763',
    },
    {
      name: "Amazon AWS Credit Card Purchase",
      date: 'July 2nd 2018',
      amount: '$300.00',
      amount_left: '$7,402.00',
      icon: 'credit-card.png',
      type: '8763',
    }
  ]

  account_selected;
  public account_available;
  public account_current;
  showAccounts = true;

  constructor(public loaderCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    this.account_selected = "7402";
    let account_index_temp = this.navParams.get("index");
    if(account_index_temp != null){
      this.account_available = this.accountslists[account_index_temp]['amount'];
      this.account_current = this.account_available - 50;
    }
  }

  ionViewDidLoad() {}

  public lineChartData:Array<any> = [
    {data: this.accountslists[0]["chartSet"], datasets: [{
      radius: 0, // radius is 0 for only this dataset
  }], label: ''},
  ];

  
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true,
    showTooltips: false,
    legend: {
      display: false
    },
    elements: {
      point: {
          radius: 0
      }
    },
    scales: {
      xAxes: [{
        display: false,
                  gridLines: {
                      display:false
                  }
              }],
      yAxes: [{
        display: false,
                  gridLines: {
                      display:false
                  }   
              }]
      }
  };
  
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: '#440026',
      borderColor: '#440026',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: '#440026',
      borderColor: '#440026',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: '#440026',
      borderColor: '#440026',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

  showAccount(event){

    this.showAccounts = false;
    console.log(event);

    const loader = this.loaderCtrl.create({
      spinner: 'ios',
      content: "Loading Account Information for ******* " + event,
      duration: 3000
    });
   
    loader.present();

    setTimeout(() => {
      console.log('Loading Successful');
      this.showAccounts = true;
    }, 3010);
    
  }

}
