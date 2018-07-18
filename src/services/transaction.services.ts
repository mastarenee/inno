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

  public set(settingName,value){
    return this.storage.set(`transaction:${ settingName }`,value);
  }
  public async get(settingName){
    return await this.storage.get(`transaction:${ settingName }`);
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
