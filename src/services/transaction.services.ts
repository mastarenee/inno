import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Config from '../config';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class TransactionServices {

  public user:any;

  constructor(public http: Http, public storage: Storage){}

  fetchAccessToken(){
    let header: Headers = new Headers();
    header.append('Authorization', 'Basic aWItZXh0OjVjYzEwZGNjLTc4NjctNGRhMy1hNDMyLTVhMzc0NTQ3YjY3Mg==');
    header.append('Content-Type', 'application/json');

    return this.http.post(Config.HOST + "/ob/auth/v1/auth/token",{ headers: header })
    .map(res => res.json());
  }

  userLogin(){
    let header: Headers = new Headers();
    header.append('Authorization', 'Bearer ' + this.user.access_token);
    header.append('Content-Type', 'application/json');

    return this.http.get(Config.HOST + "/ob/account-balance/v1/accounts/balances",{ headers: header })
    .map(res => res.json());

  }

  getTransactionQuote(amount){

    let sUri = "tel%3A06877676";
    let rUri = "iban%3AGB98MIDL07009312345678";
    let amt = "80";
    let cur = "GBP"; // Currency
    let originCtry = "BRB";
    let additional = "701"; // Country of the sender
    let additional1 = "GBR";
    let bankCode = "0123653935";
    
    this.get("transfer_amount")
    .then(
      res => { // Success
        console.log(res);
        amt = res;
      },
      err => { // Error
        
      }
    );

    this.get("country")
    .then(
      res => { // Success
        console.log(res);
        originCtry = res;
      },
      err => { // Error
        
      }
    );

    return this.http.get(Config.HOST + "/payment/mastercard/quote?sUri="+sUri+"&rUri="+rUri+"&amt="+amount+"&cur="+cur+"&originCtry="+originCtry+"&additional="+additional+"&additional="+additional1+"&bankCode="+bankCode)
    .map(res => res.json());
    
  }

  doTransactionPayment(transaction_ref, proposal_id){

    return this.http.get(Config.HOST + "/payment/mastercard/payment?propId="+proposal_id+"=&sFName=Brandon&sLName=Alleyne&sNat=BRB&sAddr=123MainStreet&sCity=Arlington&sCtry=BRB&sDOB=1985-06-24&rFName=George&rLName=Thomas&rNat=GBR&rAddr=123MainStreet&rCity=Arlington&rCtry=GBR&transRef="+transaction_ref+"&additional=701&additional=GBR")
    .map(res => res.json());
    
  }
  

  public set(settingName,value){
    return this.storage.set(`transaction:${ settingName }`,value);
  }
  public get(settingName){
    return this.storage.get(`transaction:${ settingName }`);
  }
  public async remove(settingName){
    return await this.storage.remove(`transaction:${ settingName }`);
  }
  public clear() {
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

}
