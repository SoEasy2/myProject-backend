module.exports = class ProductDto {

    constructor(model) {
        this._id = model._id;
        this.name = model.name
        this.img = model.img
        this.price = model.price
        this.description = model.description
        this.type = model.type
        this.shortDescription = model.shortDescription
        this.condition = model.condition
        this.date = model.date
        this.user = model.user
    }

}