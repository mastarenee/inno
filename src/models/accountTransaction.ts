export class accountTransaction{
    constructor(
        public account: string,
        public firstname: string,
        public lastname: string,
        public streetaddress: string,
        public city: string,
        public country: string,
        public date: string,
        public amount: string,
        public bank_country: string,
        public iban: string,
        public ban: string,
        public bic: string,
        public status: string,
        public process_id: number,
        public transaction_ref: string,
        public currency: string,
    ){}
}
