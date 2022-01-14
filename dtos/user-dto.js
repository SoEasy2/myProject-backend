module.exports = class UserDto {

    constructor(model) {
        this.email = model.email;
        this._id = model._id;
        this.isActivated = model.isActivated;
        this.avatar = model.avatar
        this.roles = model.roles
        this.logs = model.logs
        this.actions = model.actions
        this.date = model.date;
        this.name = model.name;
        this.phone = model.phone
    }

}