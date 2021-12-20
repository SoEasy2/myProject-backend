const password = '123qweqwe123', database = 'myProject';
module.exports = {
    MONGODB_URI:`mongodb+srv://draconic42:${password}@cluster0.upyji.mongodb.net/${database}?retryWrites=true&w=majority`
}