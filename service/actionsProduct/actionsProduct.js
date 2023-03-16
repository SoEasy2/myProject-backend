class ActionsProduct {
    confirmProduct(idProduct, name){
        return `Your application for a product ${idProduct} has been approved by the administrator ${name}`
    }
    notConfirmProduct(idProduct, name){
        return `Your application for a product ${idProduct} has been rejected by the administrator ${name}`
    }

}
module.exports = new ActionsProduct()