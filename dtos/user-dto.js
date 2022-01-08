module.exports = class UserDto {

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.avatar = model.avatar
        this.roles = model.roles
        this.logs = model.logs
        this.actions = model.actions
    }

}