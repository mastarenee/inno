import { Component, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class TransactionServices {

    pages: Array<{title: string, component: any, icon: string}>;
    transactionInfo: Array<{id: number, text: string}>;
    
    private transaction_information = [{
        recipient_first_name: '',
        recipient_last_name: '',
        recipient_address:'',
        recipient_nationality:'',
        recipient_tel:'',
        recipient_streetAddress:'',
        recipient_country:'',
        recipient_postal_code:'',
        recipient_city:'',
        recipient_transaction_amount:'',
        }
    ]

    private recipient_errors = [{
        firstname_error: 'First Name is required',
        lastname_error: 'Last Name is required',
        tel_error: 'Telelphone Number is required',
        street_address_error: 'Street Address is required',
        }
    ]

    constructor(public storage:Storage, public navCtrl: NavController) {

    }

    public setFirstName(firstname){
        this.transaction_information[0].recipient_first_name = firstname;

    }

    public setLastName(lastname){
        this.transaction_information[0].recipient_last_name = lastname;
    }

    /*public setTel(tel){
        this.transaction_information[0].recipient_tel = tel;
    }
    
    public setNationality(nationality){
        this.transaction_information[0].recipient_nationality = nationality;
    }

    public setStreetAddress(streetAddress){
        this.transaction_information[0].recipient_streetAddress = streetAddress;
    }

    public setCountry(country){
        this.transaction_information[0].recipient_country = country;
    }

    public setPostalCode(postal_code){
        this.transaction_information[0].recipient_postal_code = postal_code;
    }

    public setCity(city){
        this.transaction_information[0].recipient_city = city;
    }

    public setTransactionAmount(transaction){
        this.transaction_information[0].recipient_transaction_amount = transaction;
    }

    public getRecipientErrors(){
        return this.recipient_errors;
    }*/
    
    public saveDetails(){
        console.log(this.transaction_information);
        this.storage.set("transaction_information",this.transaction_information);
    }

    public getDetails(){
        
        /*this.storage.get('transaction_information').then((val) => {
            console.log('Your val is', val);
        });*/

    }

}


  