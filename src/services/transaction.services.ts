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

  getTransactionQuote(currency, amount, receiverUri, country, bic, bank_code){
    console.log(bank_code);
    let additionalCountry;
    if(currency=="GBP")
    {
      additionalCountry = "GBR";
    }
    else
    if(currency=="CAD")
    {
      additionalCountry = "CAN";
    }
    var data = {
        "sender_uri":"iban:" + receiverUri, //"78876876",
        "currency":currency, //"GBP",
        "amount":amount, //"120",
        "recipient_uri":receiverUri, //"GB98MIDL07009312345678",
        "country":country, //"BRB",
        "bank_code":bank_code, //"0123653935",
        "pay_type":"P2P",
        "additional_data":["701",additionalCountry]
    };

    console.log(data);

    let header: Headers = new Headers();
    header.append('Access-Control-Allow-Origin' , '*');
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    header.append('Accept','application/json');
    header.append('Content-Type', 'application/json');

    return this.http.post(Config.HOST + "/payment/quote",data, { headers: header }).map(res => res.json());

  }

  doTransactionPayment( recipient_name, recipient_name_last, recipient_tel, recipient_nationality, recipient_city, recipient_address, recipient_country, recipient_postal_code, account_name, bic, ban,iban, proposal_id, transaction_ref ){

    let data = {
        "proposal_id": proposal_id, //"+JLt+na/P5PtEQU+XtMQ9c0Q0EA=",
        "transaction_ref": transaction_ref, //"AQnmzl8lTXixBodnDl8HQVnY",
        "sender_fName":"Brandon",
        "sender_lName":"Alleyne",
        "sender_nationality":"BRB",
        "sender_addr":"North West",
        "sender_city":"Bridgetown",
        "sender_country":"BRB",
        "sender_dob":"1985-06-24",
        "recipient_fName": recipient_name, //"George",
        "recipient_lName": recipient_name_last, //"Thomas",
        "recipient_nationality": recipient_nationality, //"GBR",
        "recipient_addr": recipient_address, //"North George",
        "recipient_city": recipient_city, //"Bridgetown",
        "recipient_country": recipient_country, //"GBR",
        "additional":["701",recipient_country] // ["701","GBR"]
    };
      
    console.log(data);

    let header: Headers = new Headers();
    header.append('Access-Control-Allow-Origin' , '*');
    header.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    header.append('Accept','application/json');
    header.append('Content-Type', 'application/json');

    return this.http.post(Config.HOST + "/payment/payment",data, { headers: header }).map(res => res.json());
    
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
