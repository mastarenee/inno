import { Account } from "../models/account";
import { accountTransaction } from "../models/accountTransaction";

export class AccountService {

    private accounts : Account[] = [];
    public accountsTransaction: accountTransaction[] = [];

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

    addNewAccountTransaction( 
        account: string,
        firstname: string,
        lastname: string,
        streetaddress: string,
        city: string,
        country: string,
        date: string,
        amount: string,
        bank_country: string,
        iban: string,
        ban: string,
        bic: string,
        status: string,
        process_id: number,
        transaction_ref: string,
        currency: string){
        this.accountsTransaction.unshift(new accountTransaction(account, firstname, lastname, streetaddress, country, city, date, amount, bank_country, iban, ban, bic, status, process_id, transaction_ref, currency));
    }

    getAccountsTransaction(){
        return this.accountsTransaction.slice();
    }

    updateAccountTransaction(
        index:number,
        account: string,
        firstname: string,
        lastname: string,
        streetaddress: string,
        city: string,
        country: string,
        date: string,
        amount: string,
        bank_country: string,
        iban: string,
        ban: string,
        bic: string,
        status: string,
        process_id: number,
        transaction_ref: string,
        currency: string
    )
    {
        this.accountsTransaction[index]= new accountTransaction(account, firstname, lastname, streetaddress, country, city, date, amount, bank_country, iban, ban, bic, status, process_id, transaction_ref, currency);
    }
}