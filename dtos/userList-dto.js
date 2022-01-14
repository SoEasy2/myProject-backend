module.exports = class UserList {

    constructor(model) {
        this.avatar = model.avatar
        this.name = model.name
        this.email = model.email
        this.phone = model.name
        this.countTransactions = model.transactions.length
        this.date = model.date
    }

}