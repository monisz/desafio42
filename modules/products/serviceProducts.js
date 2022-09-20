const { ProductDaoFactory } = require("./productDaoFactory");
const { Product } = require("./product");
const argsparse = require('../../utils/argsparse');
 
const daoFactory = new ProductDaoFactory();

const persistenceType = argsparse.persistenceType;

class ProductService {
    constructor() {
        this.dao = daoFactory.create(persistenceType);
    }

    //Para agregar un producto
    addProductToList (newProduct) {
        newProduct.timestamp = Date.now();
        const { title, description, code, thumbnail, price, stock, timestamp } = newProduct;
        const newProd = new Product(title, description, code, thumbnail, price, stock, timestamp);
        const newId = this.dao.saveProduct(newProd);
        return newId;
    }

    //Recibe y actualiza un producto por id
    replaceProduct (id, newData) {
        const { title, description, code, thumbnail, price, stock, timestamp } = newData;
        const modifiedProduct = new Product(title, description, code, thumbnail, price, stock, timestamp);
        const updatedProduct = this.dao.updateById(id, modifiedProduct);
        return updatedProduct;
    }

    //Para obtener un producto según su id
    async getProduct (id) {
        const productFinded = await this.dao.getProductById(id);
        return productFinded;
    }

    async getListProducts () {
        const allProducts = await this.dao.getProducts();
        return allProducts; 
    }

    //Para borrar un producto según el id
    deleteProduct (id) {
        const result = this.dao.deleteProductById(id);
        return result;
    }
}

module.exports = { ProductService };