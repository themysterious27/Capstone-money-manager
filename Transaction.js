export default class Transaction {
    constructor(id, amount, date, type, sub, desc) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.type = type;
        this.sub = sub;
        this.desc = desc;
    }
}