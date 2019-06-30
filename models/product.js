const fs = require('fs');
const path = require('path');

const productPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductFromFile = (cb) => {
    fs.readFile(productPath, (err, fileContent) => {
        if(err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        // For now saving data in a file
        // read the entire file
        getProductFromFile(products => {
            products.push(this);
            fs.writeFile(productPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
    }

    static fetchAll(cb) {
        getProductFromFile(cb);
    }
}
