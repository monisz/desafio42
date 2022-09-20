const axios = require('axios').default;

const getProducts = async () => {
    const response = await axios.get('http://localhost:8080/api/productos');
    console.log(response.data);
};

/* getProducts() */
/*     .then(() => console.log("Request finalizado")) */
/*     .catch(console.error); */

const addProduct = async () => {
    const response = await axios.post('http://localhost:8080/api/productos', {
        "title": "MicroscopioAxios",
        "description":  "5x",
        "code": "MI500",
        "thumbnail": 'https://cdn3.iconfinder.com/data/icons/education-209/64/microscope-lab-science-school-128.png',
        "price": 500,
        "stock": 5
    });
    console.log(response.data);
};

/* addProduct() */
/*   .then(() => console.log("Producto agregado axios")) */
/*   .catch(console.error); */

const updateProduct = async () => {
    const response = await axios.put('http://localhost:8080/api/productos/6', {
        title: "MicroscopioAxios",
        description: "Axx",
        code: "AX600",
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/microscope-lab-science-school-128.png",
        price: 600,
        stock: 6,
        timestamp: 1663629785549
    });
    console.log(response.data);
};

/* updateProduct() */
/*     .then(() => console.log("Producto modificado Axios")) */
/*     .catch(console.error); */


const deleteProduct = async () => {
    const response = await axios.delete('http://localhost:8080/api/productos/8');
    console.log(response.data);
};

deleteProduct()
    .then(() => console.log("Producto eliminado Axios"))
    .catch(console.error);
