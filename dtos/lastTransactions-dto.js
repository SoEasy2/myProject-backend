module.exports = class ProductDto {

    constructor(model) {
       this.price = model.price;
       this.date = model.date;
       this.user = model.user;
       this.id = model._id
    }

}