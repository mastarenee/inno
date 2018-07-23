import { Injectable } from "@angular/core";
import { Sender } from "../models/sender";

@Injectable()
export class SenderInfoService {
    private sender: Sender[]=[];

    addUser(userid,password,fname,lname,nationality,country,city,address){
       this.sender.push(userid,password,fname,lname,nationality,country,city,address)
    }

    fetchUserData(userid){
        for(let i=0; i<this.sender.length;i++)
        {
            if(this.sender[i].userid == userid)
            {
                return this.sender[i];
            }
        }
    }
}