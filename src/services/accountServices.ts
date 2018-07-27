import { Account } from "../models/account";

export class AccountService {
    private accounts : Account[] = [];

    constructor(){
        
    }

    addNewAccount( 
        alias: string,
        amount: number,
        account: string){
        this.accounts.push(new Account(alias, amount, account));
    }

    getAccounts(){
        return this.accounts.slice();
    }

    updateAccount(
        index:number,
        alias: string,
        amount: number,
        account: string
    )
    {
        this.accounts[index]= new Account(alias, amount,account);
    }
}